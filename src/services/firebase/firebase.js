// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: "e-commerce-app-hunt",
  storageBucket: "e-commerce-app-hunt.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics needs a measurementId, so only initialise it when one is
// configured. Calling getAnalytics without it throws, which would take
// down this module and with it every route that reads from the database.
let analytics = null;
if (firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch {
    analytics = null;
  }
}

export { analytics };
export const db = getDatabase(app);
