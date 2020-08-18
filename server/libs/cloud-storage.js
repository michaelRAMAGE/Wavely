/* 
This file houses Google Cloud Storage config info.
Google Cloud Storage is used to store large audio
files to be converted into transcripts.
*/
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');

const bucketName = process.env.FB_storageBucket;
const storage = new Storage({keyFilename: process.env.API_KEY_FILE_NAME});

module.exports = (filename) => {
    console.log('In cloud-storage.js...');
    return new Promise((resolve,reject) => { 
        storage.bucket(bucketName).upload(filename, (err, file) => {
            if (!err) { console.log(file); resolve(file) }
            else { reject(err) }
        });
    }); 
};
