/**
 * @description This function calls STT API and receives data 
 * to return to server, which is then provided to our user. 
*/
require('dotenv').config();
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

module.exports = async (file_name) => {
  console.log('In cloud-speech.js...');
  console.log(`Filename: ${file_name}`);

  // Cloud storage for audio files 
  const bucket_name = process.env.FB_storageBucket;
  const cloud_storage_loc = bucket_name + '/' + file_name; 

    // Configuration 
  const config = {
    enableWordTimeOffsets: true,
    encoding: 'LINEAR16',
    languageCode: 'en-US',
    sampleRateHertz: 16000,
    enableAutomaticPunctuation: true,
  }
  const client = new speech.SpeechClient({keyFilename: process.env.API_KEY_FILE_NAME}); // Creates a client
  const audio = { uri: cloud_storage_loc }; // Retrieve from cloud storage
  const request = {
    audio: audio,
    config: config,
  };

  // Send request to api
  const [operation] = await client.longRunningRecognize(request).catch(err => { throw new Error(err); });
  const [response] = await operation.promise().catch(err => { throw new Error(err) });
  console.log('Response: ', response)

  // Process received data, return to server
  var response_data = { 
    audio_name: file_name, 
    speech_data: []
  }; 

  response.results.forEach(result => {
    console.log('Result = Response.results: ', result)

    // Store word time objects 
    var words_times = []

    // Note: response data is in chunks; response_data.speech_data holds the chunks
    result.alternatives[0].words.forEach(wordInfo => {
      console.log('Word info: ', wordInfo);
        // NOTE: If you have a time offset exceeding 2^32 seconds, use the
        // wordInfo.{x}Time.seconds.high to calculate seconds.
        
        // Individual word time stamps
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          '.' +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          '.' +
          wordInfo.endTime.nanos / 100000000;
        
        words_times.push({time_span: { startSecs: startSecs, endSecs: endSecs} });
    });
    
    // Start to End time for transcript chunk (based on individual word time stamps)
    var start_time_transcript = words_times.length > 0 ? words_times[0].time_span.startSecs : null;
    var end_time_transcript = words_times.length > 0 ? words_times[words_times.length-1].time_span.endSecs : null;

    // Data to return to server call to this function 
    response_data.speech_data.push({ 
        text: result.alternatives[0].transcript, 
        time_span: {startSecs: start_time_transcript, endSecs: end_time_transcript}, 
        confidence: result.alternatives[0].confidence,
    });
  });
  return response_data; 
}
