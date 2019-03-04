const firebase = require("firebase/app");
require('firebase/auth');
require("firebase/firestore");

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain:  process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL:  process.env.FIREBASE_DATABASE_URL,
    projectId:  "course-d3-firebase",
    storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, db as default};
