/**
 * @typedef File
 * @type {Object}
 * @property {String} uri - File uri
 * @property {Integer} duration - Length in milliseconds
 * @property {String} width - Width of video, if file is video
 * @property {String} height - Height of video, if file is video
 * @property {String} type - Currently supported: audio | video
 */

/**
 * @typedef SpeechData
 * @type {Array.<{transcript: { 
    *  text: String, 
    *  time_span: {
    *      startSecs: Number,
    *      endSecs: Number
    *  }, 
    *  confidence: number }}>}
*/
   
/**
* @typedef ResponseData
* @type {Object}
* @property {String} audio_name - name of audio file (used for database)
* @property {SpeechData} speech_data - formatted data from STT API
*/

/**
* @typedef Transcript
* @type {Object}
* @property {String} id - 
* @property {File} file_info - Length in milliseconds
* @property {String} name - Width of video, if file is video
* @property {String} date - Height of video, if file is video
* @property {String} type - Currently supported: audio | video
*/

export Transcript