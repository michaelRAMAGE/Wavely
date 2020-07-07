/* 
This file houses an upload function for client video/audio
file uploads to our server.
*/
const axios = require('axios'); 

module.exports = async (file_data) => {
    const { platform, kind, uri } = file_data; 
    const server = 'http://10.84.1.78:3000/' + kind.toString();
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
        });
        return data; 
    }
    catch (error) { console.error('Error: ', error) }
}

