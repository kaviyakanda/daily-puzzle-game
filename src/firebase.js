import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF4tgGACHf_ThXvAzZ1qUhFaTqP8bv3ME",
  authDomain: "daily-puzzle-game-kavi.firebaseapp.com",
  projectId: "daily-puzzle-game-kavi",
  storageBucket: "daily-puzzle-game-kavi.firebasestorage.app",
  messagingSenderId: "82379285196",
  appId: "1:82379285196:web:1a2771a230ca3513ba1869",
  measurementId: "G-3SVGVHG3JX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);