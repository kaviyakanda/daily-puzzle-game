import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLogin }) {

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      onLogin(result.user);

    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="container dashboard-bg">

      <div className="card">

        <h1 style={{ marginBottom: 20 }}>🌟 Daily Puzzle Game</h1>

        <button className="btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>

      </div>

    </div>
  );
}
