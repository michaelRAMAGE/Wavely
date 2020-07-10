/* 
This file houses Google Cloud Storage config info.
Google Cloud Storage is used to store large audio
files to be converted into transcripts.
*/
const {Storage} = require('@google-cloud/storage');

const bucketName = 'gs://wavely-1593222928316.appspot.com';
const storage = new Storage({keyFilename: '/home/ramage/projects/Wavely/wavely/wavely-1593222928316-527b86c62251.json'});
// const storage = new Storage({keyFilename: "key.json"});

module.exports = (filename) => {
    console.log('In cloud-storage.js...');
    return new Promise((resolve,reject) => { 
        storage.bucket(bucketName).upload(filename, (err, file) => {
            if (!err) { console.log(file); resolve(file) }
            else { reject(err) }
        });
    }); 
};
