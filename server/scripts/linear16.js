/*
This file houses functions for 
converting our video or audio to 
an accepted format for Google Cloud STT API

Relevant documentation
1. https://en.wikipedia.org/wiki/List_of_codecs 
(Section 1.1, LPCM audio and WAV container)
2. https://ffmpeg.org/ffmpeg.html 
(Sections
    Main options (5.4) for -f 
    Video options (5.7) for -acodec, -vn,
    ac, -ar
)
3. https://ffmpeg.org/ffmpeg.html (npm module used)

Fixed error : 
Look back to understand earlier bug.
Replicate by moving resolve outside of command chain.
This will result in cloud_storage.js being called before
conversion is completed. 
*/


const fs = require('fs');
const os = require('os');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const FfmpegCommand = require('fluent-ffmpeg');
FfmpegCommand.setFfmpegPath(ffmpegPath);

module.exports = (paths) => {
    console.log('In linear16.js...');
    return new Promise((resolve, reject) => { // starrt of promise 
        if (!paths.input || !paths.output) { throw new Error('Input and output paths must be specified')}; 
        if (!fs.existsSync(paths.input)) { throw new Error('Input file does not exist')};
        try {
            var command = new FfmpegCommand();
            console.log('before conversion')
            command
            .on('start', () => console.log('Starting conversion...'))
            .input(paths.input)
            .noVideo()
            .outputOptions([
                '-f s16le', // output format
                '-acodec pcm_s16le',// set audio codec
                '-vn', // skip inclusion of video
                '-ac 1', // number of audio channels
                '-ar 16k', // audio sampling frequency
                '-map_metadata -1'
            ])
            .save(paths.output)
            .on('end', (stdout, stderr) => { console.log('Conversion ending...'); resolve(paths.output); });
        }
        catch (e) { reject(e) }; 
    }); // end of promise
}