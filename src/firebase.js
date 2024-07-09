// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPuDFON81nHTcDagv4iaC6nhh9LpZYV6k",
  authDomain: "pinfluence-2a434.firebaseapp.com",
  projectId: "pinfluence-2a434",
  storageBucket: "pinfluence-2a434.appspot.com",
  messagingSenderId: "569792955341",
  appId: "1:569792955341:web:d080870dad69140591fa84",
  measurementId: "G-P3LQVH6S1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize other Firebase services
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const authInstance = getAuth(app);

// Create a GoogleAuthProvider
const provider = new GoogleAuthProvider();

export { storage, db, authInstance, provider };
