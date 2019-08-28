import firebase from 'firebase';

//API details
const config = {
    apiKey: "AIzaSyBvyrXwQtpHGk5sX0guEWtL1IhmDcPx7nw",
    authDomain: "myfirstproject-b8272.firebaseapp.com",
    databaseURL: "https://myfirstproject-b8272.firebaseio.com",
    projectId: "myfirstproject-b8272",
    storageBucket: "",
    messagingSenderId: "677700102579",
    appId: "1:677700102579:web:147946e9fca0a56d"
  };

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();


