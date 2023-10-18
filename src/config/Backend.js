// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlC2K46WNp0yutrn9S2Vfwu50B0-ogzWI",
  authDomain: "software-backend-43062.firebaseapp.com",
  projectId: "software-backend-43062",
  storageBucket: "software-backend-43062.appspot.com",
  messagingSenderId: "455699231953",
  appId: "1:455699231953:web:bdbf38f4823da673ce01f0",
  measurementId: "G-HJ6RSRRLYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);