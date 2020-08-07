// const functions = require('firebase-functions');


// export const addVideo = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

// export const getVideo = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

import { firebase } from '../config';

/**
 * @description Update existing transcript
 */
export const updateTranscript = (key, transcriptCaptions) => { // tested (good)
    console.log('[updateTranscript:18] updateTranscript called')
    const user = firebase.auth().currentUser;
    console.log(`Upload > current user: ${user}`);
        if (user) {
            console.log(`Updating transcript...: ${transcriptCaptions}`)
            var unsubscribe = firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('transcripts')
                    .doc(key)
                    .update({'data.speech_data': transcriptCaptions}); 
            return unsubscribe;
        }
        else {
            throw new Error('Error: user is not recognized')
        }
};  


/**
 * @description Save transcript to database
*/
export const saveTranscript = (transcript) => { // save to database
    console.log('[saveTranscript:40] saveTranscript called')
    try {
        const user = firebase.auth().currentUser;
        console.log(`Upload > current user: ${user}`);
        if (user) {
            console.log(`Saving transcript...: ${transcript}`)
            firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('transcripts')
                    .add(transcript); 
        }
        else {
            throw new Error('Error: user is not recognized')
        }
    }
    catch (err) { throw (err) }
};   

/**
 * @description Loads all user transcripts to update
 * TranscriptListScreen.
 * @returns {Object} { transcript_list, unsubscribe }
 */
export const getAllTranscripts =  (transcriptState) => { // tested (good)
    console.log('[transcriptFunctions:64] load_all_transcripts called')
    var user = firebase.auth().currentUser;
    if (user) {
        var transcript_list = [];  
        const unsubscribe = firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .collection('transcripts')
                .onSnapshot(snapshot => {
                    if (!snapshot.empty) { 
                        var temp_list = []
                        snapshot.forEach(transcript => {
                            temp_list.push({                               
                                ...transcript.data(),
                                key: transcript.id})
                            } 
                        );
                        transcript_list = temp_list; 
                        transcriptState(transcript_list)
                    }
                    else { console.log('There are no transcripts')}
                }, (err => { throw(err) })); 
        return unsubscribe; 
    }
    else { throw new Error('User should be logged in, but firebase says otherwise. \
    (transcriptFunctions.js:90)') }
}


