// firebase.js (same as provided by you)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyC70nNgyOEoCNe9xByCy5Fo7yhMkOhA6XA",
  authDomain: "bitecount-c1fed.firebaseapp.com",
  projectId: "bitecount-c1fed",
  storageBucket: "bitecount-c1fed.appspot.com",
  messagingSenderId: "215235954100",
  appId: "1:215235954100:web:a0f6ee326b83b0f6bc5ee1",
  measurementId: "G-HL1E3LE281"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db };
