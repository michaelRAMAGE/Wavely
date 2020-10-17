// require('dotenv').config();
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const FB_apiKey="AIzaSyA5l_u9IC1NRBk1-_ALWtIZOzE83F7QN_E"
const FB_authDomain="wavely-1593222928316.firebaseapp.com"
const FB_databaseURL="https://wavely-1593222928316.firebaseio.com"
const FB_projectId="wavely-1593222928316"
const FB_storageBucket="gs://wavely-1593222928316.appspot.com"
const FB_messagingSenderId="167508676948"
const FB_appId="1:167508676948:android:194fdb542ac40e829978c1"


const firebaseConfig = {
  apiKey: FB_apiKey,
  authDomain: FB_authDomain,
  databaseURL: FB_databaseURL,
  projectId: FB_projectId,
  storageBucket:FB_storageBucket,
  messagingSenderId: FB_messagingSenderId,
  appId: FB_appId,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };