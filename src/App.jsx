import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";




import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import WordPuzzle from "./components/WordPuzzle";
import MathPuzzle from "./components/MathPuzzle";
import LogicPuzzle from "./components/LogicPuzzle";
import NumberPuzzle from "./components/NumberPuzzle";
import Login from "./components/Login";
import "./App.css";

export default function App() {

  // ✅ store logged in user
  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => {
    setUser(u);
  });

  return () => unsub();
}, []);
  const [user, setUser] = useState(null);

  const [section, setSection] = useState("dashboard");
  const [transition, setTransition] = useState(false);

  const navigate = (s) => {
    setTransition(true);
    setTimeout(() => {
      setSection(s);
      setTransition(false);
    }, 300);
  };

  // ✅ if NOT logged in → show login first
  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  const renderSection = () => {
    switch (section) {
      case "word":
        return <WordPuzzle goHome={() => navigate("dashboard")} />;
      case "math":
        return <MathPuzzle goHome={() => navigate("dashboard")} />;
      case "logic":
        return <LogicPuzzle goHome={() => navigate("dashboard")} />;
      case "number":
        return <NumberPuzzle goHome={() => navigate("dashboard")} />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div className={`container ${section}-bg ${transition ? "fade-out" : "fade-in"}`}>
      {renderSection()}
    </div>
  );
}
