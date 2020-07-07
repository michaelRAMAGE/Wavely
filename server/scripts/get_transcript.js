/* 
This script calls linear16 to convert
video/audio to linear16 format with wav container.
Cloud storage is then called to store the linear16
wav file; we cannot send large files to STT API 
unless Google Storage Buckets are used. 
Lastly, we call Cloud Speech API and 
have it access the Google Cloud Storage bucket,
where it then performs STT and outputs a transcript
in results, which we return to server. 
*/
const linear16 = require('./linear16');
const cloud_speech = require('../libs/cloud-speech');
const cloud_storage = require('../libs/cloud-storage');

module.exports = (paths) => {
    console.log('In get_transcripts...');
    return new Promise((resolve, reject) => { 
        linear16(paths)
        .then(wav_file => { return cloud_storage(wav_file) } )
        .then(speech_input => { return cloud_speech(speech_input) } )
        .then(results => resolve(results))
        .catch(err => reject(err)); 
    });
}; 