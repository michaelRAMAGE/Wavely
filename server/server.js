
/* 
This file contains routing for
uploading mobile video and audio files
to this server. In the routing we call 
a script that handles the form data's file.
This file is then fed into get_transcript(),
an export from get_transcript.js. If no error,
we obtain a transcript to send back to client. 
*/
require('dotenv').config();
const express = require('express');
const formidable = require('formidable');
const get_transcript = require('./scripts/get_transcript'); 
const app = express(); 

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Wavely!'});
});

app.post('/', (req, res, next) => {
    console.log('Handling uploaded file on server...');
    const options = {
        keepExtensions: true,
        multiples: true,
        uploadDir: './test_videos'
    };
    const form = new formidable(options);
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err)
            return;
        }
        const { path, name, type } = files.file;
        const paths = {
            input: path,
            output: path.split('.')[0].toString() + '.wav'
        };
        get_transcript(paths)
        .then(transcript => { console.log(transcript); res.send(transcript) } )
        .catch(err => { throw(err) } ); 
    });
}); 

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});
