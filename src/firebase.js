import firebase from "firebase/app";
require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyAetOGjT6KLFPW9wIYxqBdFMnR9hq4fgXw",
  authDomain: "testproject-82f39.firebaseapp.com",
  projectId: "testproject-82f39",
  storageBucket: "testproject-82f39.appspot.com",
  messagingSenderId: "654692614337",
  appId: "1:654692614337:web:f8a4c5ce96d04106f2d440",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export { firebase, db as default };
