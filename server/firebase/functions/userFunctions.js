// const functions = require('firebase-functions');

// export const createUser = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

// export const getUser = functions.http.onRequest( async (req, res) => {
//     // do stuff
// })

import { firebase } from "../config";

/**
 * @description Sign in to user account
 * @param {String} email - Account email
 * @param {String} password - Account password
 */
export const getUser = async (email, password) => { // tested (good)
    var response = await firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
            alert("Wrong password");
        } 
        else if (errorCode === "auth/invalid-email") {
            alert("Bad email format");
        } 
        else if (errorCode === "auth/user-not-found") {
            alert("Wrong email");
        } 
        else {
            alert(errorMessage);
        }
        return null;
    });
    if (response) {
        var firestoreDocument = await firebase
        .firestore()
        .collection("users")
        .doc(response.user.uid)
        .get()
        .catch(err => { throw(err) });
        if (!firestoreDocument.exists) {
            Alert.alert("Cannot find a user with those credentials");
            return null;
        } 
        else {
            return firestoreDocument.data();
        }
    }
    
};

/**
 * @description Create a user
 * @param {String} email - Account email
 * @param {String} password - Account password
 * @param {String} fullName - User's name (or nickname)
 */
export const createUser = async (email, password, fullName) => {
    var response = await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak')
            } 
            else if (errorCode == 'auth/email-already-in-use') {
                alert('Email already exists')
            }
            else if (errorCode == "auth/invalid-email") {
                alert('Bad email format')
            }             
            else {
                alert(errorMessage)
            }
            return null; 
        });
    const data = {
        id: response.user.uid,
        email,
        fullName,
    };
    if (response) { 
        // Note: user will not resolve when offline 
        const user = await firebase.firestore()
            .collection("users").doc(data.id).set(data)
            .catch(err => { alert(err); return null;  }); 
        return user;
    }
};

/**
 * @description Sign user out
 */
export const signOut = () => { 
    firebase.auth().signOut().then(() => {
        console.log("User signed out");
    }).catch((err) => {
        throw err;
    })};
