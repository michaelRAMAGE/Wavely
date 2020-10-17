/* 
This file houses an upload function for client video/audio
file uploads to our server.
*/
// require('dotenv').config();
const axios = require('axios'); 
const UPLOAD_SERVER = "http://81226f9163f1.ngrok.io"
module.exports = async (file_data) => {
    console.log(`Uploading file to server...${file_data}`);
    const { platform, kind, uri } = file_data; 
    const server = UPLOAD_SERVER;
    try {
        const formData = new FormData();
        formData.append('file', { // file to upload to server
            uri,
            type: platform === 'android'? 
                ( kind === 'video' ? 'video/mp4' : 'audio/m4a') 
                : 
                ( kind === 'video' ? 'video/mov' : 'audio/x-wav'),
            name: platform === 'android' ? 
                ( kind === 'video' ? `${Date.now()}.mp4` : `${Date.now()}.m4a`) 
                : 
                ( kind === 'video' ? `${Date.now()}.mov` : `${Date.now()}.m4a`),
        }); 
        const { data } = await axios.post(server, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).catch(err => { console.error(err) });
        return data; // response from axios post req
    }
    catch (err) { throw(err) }
}

