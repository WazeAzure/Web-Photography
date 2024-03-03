// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYs6uJMztIzVQbkehSvym21unxwm3_CMo",
  authDomain: "web-photography-5623c.firebaseapp.com",
  projectId: "web-photography-5623c",
  storageBucket: "web-photography-5623c.appspot.com",
  messagingSenderId: "710912939852",
  appId: "1:710912939852:web:7e4a19c28c31002667e1e9",
  measurementId: "G-KZGRG1QKPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;