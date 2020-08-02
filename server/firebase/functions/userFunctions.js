// const functions = require('firebase-functions');


// export const createUser = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

// export const getUser = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

import { firebase } from '../config';

/**
 * @description Sign in to user account
 * @param {String} email - Account email
 * @param {String} password - Account password
 */
export const getUser = (email, password) => {
    const user = null; 
    firebase // login
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
        const uid = response.user.uid;
        firebase
        .firestore().collection('users')
        .doc(uid)
        .get()
        .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
                Alert.alert('Cannot find a user with those credentials')
                return;
            }
            user = firestoreDocument.data()
        })
        .catch(err => {
            alert(err)
        });
    })
    .catch(err => {
        alert(err)
    })    
    return user; 
}

/**
 * @description Create a user
 * @param {String} email - Account email
 * @param {String} password - Account password
 * @param {String} fullName - User's name (or nickname)
 */
export const createUser = (email, password, fullName) => {
    const user = null;
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid;
            const data = {
                id: uid,
                email,
                fullName,
            };
            const userRef = firebase.firestore().collection('users');
            userRef.doc(uid)
                .set(data)
                .then(() => {
                    user = data; 
                })
                .catch(error => alert(error));
        })
        .catch(error => alert(error));
    return user;  
}; 

/**
 * @description Sign user out
 */
export const signOut = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {  
        console.log('User signed out'); 
    })
    .catch(err => { throw(err) });  
}
 

