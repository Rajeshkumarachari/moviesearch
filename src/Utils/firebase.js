// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_cx9EFUK9oM1m6tXA-FRI03_dxwgl9k4",
  authDomain: "moviesearch-4b11b.firebaseapp.com",
  projectId: "moviesearch-4b11b",
  storageBucket: "moviesearch-4b11b.appspot.com",
  messagingSenderId: "57781907039",
  appId: "1:57781907039:web:5c41481d03d273612b75ea",
  measurementId: "G-LBPW33BQZ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
