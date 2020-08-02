// const functions = require('firebase-functions');


// export const addVideo = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

// export const getVideo = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

import { firebase } from '../config';

/**
 * @description Save transcript to database
*/
export const saveTranscript = (transcript) => { // save to database
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
export const getAllTranscripts = () => {
    console.log('Render action (TranscripListScreen)')
    const transcript_list = [];
    var unsubscribe = () => {};
    var user = firebase.auth().currentUser;
    if (user) { // Get transcripts from database
        const subscribe = firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .collection('transcripts')
                .onSnapshot(snapshot => {
                    if (!snapshot.empty) { // Access documents within snapshot
                        const temp_list = []
                        snapshot.forEach(transcript => {
                            console.log('transcript: ', transcript);
                            temp_list.push({
                                ...transcript.data(),
                                key: transcript.id,
                            });
                        }); 
                        transcript_list = temp_list; 
                    }
                    else {
                        console.log('There are no transcripts to retrieve.');
                    }
                });
        unsubscribe = subscribe; 
    }
    else { console.log('User not recognized.')}
    return { transcripts: transcript_list, unsubscribe: unsubscribe};

}

export const getTranscript = () => {}; 
