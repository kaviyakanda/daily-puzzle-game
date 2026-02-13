import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLogin }) {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log("Logged in:", user);

      onLogin(user); // go to dashboard
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="card dashboard-bg">
      <h1 style={{ marginBottom: "20px" }}>🌟 Daily Puzzle Game</h1>
      <p style={{ marginBottom: "20px" }}>Sign in to continue</p>

      <button className="btn" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
