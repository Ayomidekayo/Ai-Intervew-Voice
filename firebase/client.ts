// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiAjhSGMHRnEbR3MkEP0WTqMerHNqfXM4",
  authDomain: "newinterviewprep.firebaseapp.com",
  projectId: "newinterviewprep",
  storageBucket: "newinterviewprep.firebasestorage.app",
  messagingSenderId: "251044593087",
  appId: "1:251044593087:web:1d91d676b9f67623c0350a",
  measurementId: "G-HXG3CBV5ND"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);




