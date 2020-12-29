import firebase from "firebase";
import "firebase/firestore";

let config = {
    apiKey: "AIzaSyC794FQFZhmRSN7CO_OuZ3Gc_H_r1S8Hh4",
    authDomain: "duruproject-92e8f.firebaseapp.com",
    databaseURL: "https://duruproject-92e8f.firebaseio.com",
    projectId: "duruproject-92e8f",
    storageBucket: "duruproject-92e8f.appspot.com",
    messagingSenderId: "961413352451",
    appId: "1:961413352451:web:3fc7d1f0291a29f07d1236",
    measurementId: "G-CXK5971JRE"
};

firebase.initializeApp(config);

export default firebase.firestore();