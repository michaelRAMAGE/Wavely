import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5l_u9IC1NRBk1-_ALWtIZOzE83F7QN_E',
  authDomain: 'wavely-1593222928316.firebaseapp.com',
  databaseURL: 'https://wavely-1593222928316.firebaseio.com',
  projectId: 'wavely-1593222928316',
  storageBucket: 'gs://wavely-1593222928316.appspot.com',
  messagingSenderId: '167508676948',
  appId: '1:167508676948:android:194fdb542ac40e829978c1',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };