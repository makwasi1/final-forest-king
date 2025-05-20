// // firebase.js
// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import firebaseConfig from './firebaseConfig';

// const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const firestore = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpRH7tEKybDwwBZUP6HH0HWWDutqeSJAc",
  authDomain: "eshop-97e0a.firebaseapp.com",
  databaseURL: "https://eshop-97e0a-default-rtdb.firebaseio.com",
  projectId: "eshop-97e0a",
  storageBucket: "eshop-97e0a.appspot.com",
  messagingSenderId: "836742001746",
  appId: "1:836742001746:web:52566109d9bede6e66db8b",
  measurementId: "G-1J5857MVR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app);