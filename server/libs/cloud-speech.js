/* 
This file houses the Google Cloud Speech To Text API
call. This is used to send audio and receive transcript
*/

/*
Instead of returning audio_uri,
return file_name and then on 
get audio, use cloud uri.

Replaced with file_name.
*/
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

module.exports = async (file_name) => {
  console.log('In cloud-speech.js...');
  console.log(`Filename: ${file_name}`);

  // initialization
  const bucket_name = 'gs://wavely-1593222928316.appspot.com';
  const cloud_storage_loc = bucket_name + '/' + file_name; 
  const config = {
    enableWordTimeOffsets: true,
    encoding: 'LINEAR16',
    languageCode: 'en-US',
    sampleRateHertz: 16000,
    enableAutomaticPunctuation: true,
  }
  const client = new speech.SpeechClient({keyFilename: '/home/ramage/projects/Wavely/wavely/wavely-1593222928316-527b86c62251.json'}); // Creates a client
  const audio = { uri: cloud_storage_loc }; // Retrieve from cloud storage
  const request = {
    audio: audio,
    config: config,
  };

  // send request to api
  const [operation] = await client.longRunningRecognize(request).catch(err => { throw new Error(err); });
  const [response] = await operation.promise().catch(err => { throw new Error(err) });
  console.log('Response: ', response)

  // process received data, return to server
  var response_data = { 
    audio_name: file_name, 
    speech_data: []
  }; 

  response.results.forEach(result => {
    console.log('Result = Response.results: ', result)
    var words_times = []

    // Note: response data is in chunks; response_data.speech_data holds the chunks
    result.alternatives[0].words.forEach(wordInfo => {
      console.log('Word info: ', wordInfo);
        // NOTE: If you have a time offset exceeding 2^32 seconds, use the
        // wordInfo.{x}Time.seconds.high to calculate seconds.
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          '.' +
          wordInfo.startTime.nanos / 100000000;
          const endSecs =
          `${wordInfo.endTime.seconds}` +
          '.' +
          wordInfo.endTime.nanos / 100000000;
        
        words_times.push({word: wordInfo.word, time_span: { startSecs: startSecs, endSecs: endSecs} });
        // console.log(`Word: ${wordInfo.word}`);
        // console.log(`\t ${startSecs} secs - ${endSecs} secs`);
    });
    var start_time_transcript = words_times.length > 0 ? words_times[0].startSecs : null;
    var end_time_transcript = words_times[words_times.length-1].endSecs;

    response_data.speech_data.push({ 
      words: words_times, 
      transcript: {
        text: result.alternatives[0].trancript, 
        time_span: {startSecs: start_time_transcript, endSecs: end_time_transcript}, 
        confidence: result.alternatives[0].confidence,
      }
    });
  });
  return response_data; 
}
