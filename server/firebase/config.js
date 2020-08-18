require('dotenv').config();
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FB_apiKey,
  authDomain: process.env.FB_authDomain,
  databaseURL: process.env.FB_databaseURL,
  projectId: process.env.FB_projectId,
  storageBucket: process.env.FB_storageBucket,
  messagingSenderId: process.env.FB_messageingSenderId,
  appId: process.env.FB_appId,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };