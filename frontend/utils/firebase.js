// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-172f9.firebaseapp.com",
  projectId: "cortexai-172f9",
  storageBucket: "cortexai-172f9.firebasestorage.app",
  messagingSenderId: "428104212065",
  appId: "1:428104212065:web:7948e58a8bb47cda0d1420"
};

// Initialize Firebase only when a real API key is configured, otherwise
// getAuth() throws and crashes the app on load.
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const isConfigured = Boolean(apiKey) && apiKey !== "add your firebase api key";
const app = isConfigured ? initializeApp(firebaseConfig) : null
export const auth = app ? getAuth(app) : null
export const googleProvider = new GoogleAuthProvider()