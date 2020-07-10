/* 
This file houses the Google Cloud Speech To Text API
call. This is used to send audio and receive transcript
*/
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

module.exports = async (file_name) => {
  console.log('In cloud-speech.js...');
  const bucket_name = 'gs://wavely-1593222928316.appspot.com';
  const cloud_storage_loc = bucket_name + '/' + file_name; 
  const config = {
    enableWordTimeOffsets: true,
    encoding: 'LINEAR16',
    languageCode: 'en-US',
    sampleRateHertz: 16000
  }
  const client = new speech.SpeechClient({keyFilename: '/home/ramage/projects/Wavely/wavely/wavely-1593222928316-527b86c62251.json'}); // Creates a client
  const audio = { uri: cloud_storage_loc }; // Retrieve from cloud storage
  const request = {
    audio: audio,
    config: config,
  };
  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();
  var transcript = {rawTranscript: response.results.result.alternatives[0].transcript, wordInfo: []};
  response.results.forEach(result => {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
      result.alternatives[0].words.forEach(wordInfo => {
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
          transcript.wordInfo.push({word: wordInfo.word, startSecs: startSecs, endSecs: endSecs});
          console.log(`Word: ${wordInfo.word}`);
          console.log(`\t ${startSecs} secs - ${endSecs} secs`);
      });
  });
  return transcript; 
}
