// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaMdykPJ6m5ZiC2GcBQIT5NmN3nj_5IR4",
  authDomain: "hackrpi2025.firebaseapp.com",
  projectId: "hackrpi2025",
  storageBucket: "hackrpi2025.firebasestorage.app",
  messagingSenderId: "46332921398",
  appId: "1:46332921398:web:7a2e2fe1f1f640e817fa97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
