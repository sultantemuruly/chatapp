// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID

  // apiKey: "AIzaSyDE2k_wpVSpOHxHKPQ9zmwNj6GlnlqPq54",
  // authDomain: "chatapp-5fa54.firebaseapp.com",
  // projectId: "chatapp-5fa54",
  // storageBucket: "chatapp-5fa54.appspot.com",
  // messagingSenderId: "562003573251",
  // appId: "1:562003573251:web:e4b05be4e665152e70ac36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
