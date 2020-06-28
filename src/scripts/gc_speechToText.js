// export GOOGLE_APPLICATION_CREDENTIALS='/home/ramage/projects/Wavely/wavely/config/Wavely-47c4a6851488.json'
async function main() {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech').v1p1beta1;
    const fs = require('fs');
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    // The name of the audio file to transcribe
    const fileName = './resources/audio.raw';
  
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      model: 'phone_call', // and video
      enableWordTimeOffsets: true
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);

    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
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
            console.log(`Word: ${wordInfo.word}`);
            console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        });
    });
  
    // // Detects speech in the audio file
    // const [response] = await client.recognize(request);
    // const transcription = response.results
    //   .map(result => result.alternatives[0].transcript)
    //   .join('\n');
    // console.log(`Transcription: ${transcription}`);
}
main().catch(console.error);
