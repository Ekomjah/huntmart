// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB67Y94F0T7n3960P5joB3IMHj5IUjwwD0",
  authDomain: "e-commerce-app-hunt.firebaseapp.com",
  databaseURL: "https://e-commerce-app-hunt-default-rtdb.firebaseio.com",
  projectId: "e-commerce-app-hunt",
  storageBucket: "e-commerce-app-hunt.firebasestorage.app",
  messagingSenderId: "435876210466",
  appId: "1:435876210466:web:84f665f1a3c9f5df0ba77b",
  measurementId: "G-1DZWFSBDTF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
