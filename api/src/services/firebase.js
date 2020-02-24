// import * as firebase from 'firebase';
const firebase = require('firebase');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "checked-5a243.firebaseapp.com",
  databaseURL: "https://checked-5a243.firebaseio.com",
  projectId: "checked-5a243",
  storageBucket: "checked-5a243.appspot.com",
  messagingSenderId: "1008338960130",
  appId: process.env.FIREBASE_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const file = ``;
const ref = firebase.storage().ref().child('images/test.png');
ref.put(file).then((snapshot) => console.log('FirebaseService: Uploaded a file to the database'));



// export const FirebaseService = {

// };
