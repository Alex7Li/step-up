// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { realtimeDB } from "firebase/database"
import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcHmOBDdiJDP6wVAWjusj_BbMC2gDgtsk",
  authDomain: "step-up-7b440.firebaseapp.com",
  databaseURL: "https://step-up-7b440-default-rtdb.firebaseio.com",
  projectId: "step-up-7b440",
  storageBucket: "step-up-7b440.appspot.com",
  messagingSenderId: "964420966815",
  appId: "1:964420966815:web:5903bbfe4f14b7e828c5aa",
  measurementId: "G-NESB5G0KW1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);