import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

import {getAuth} from 'firebase/auth';
// import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA49VmTMBr8w3BARosxXTtwzgF61qeZjcU',
  authDomain: 'cafe-doan3.firebaseapp.com',
  projectId: 'cafe-doan3',
  storageBucket: 'cafe-doan3.appspot.com',
  messagingSenderId: '902466562684',
  appId: '1:902466562684:web:9a4d34a4f9c5fce088f7f9',
  measurementId: 'G-N59HR463P3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

// export {auth};
