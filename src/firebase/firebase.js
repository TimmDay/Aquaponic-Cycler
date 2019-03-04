const firebase = require("firebase/app");
require('firebase/auth');
require("firebase/firestore");

const config = {
    apiKey: "AIzaSyC361HII1nxBAH61eyB_RNw50tOwgCh5TQ",
    authDomain:  "course-d3-firebase.firebaseapp.com",
    databaseURL:  "https://course-d3-firebase.firebaseio.com",
    projectId:  "course-d3-firebase",
    storageBucket:  "course-d3-firebase.appspot.com",
    messagingSenderId:  "255578645190"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, db as default};
