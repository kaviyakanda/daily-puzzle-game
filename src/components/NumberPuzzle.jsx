import React, { useState } from "react";
import { getDailySeed } from "../utils";


export default function NumberPuzzle({ goHome }) {
  const today = new Date().toISOString().split("T")[0];

  const [guess, setGuess] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ deterministic daily target (NO RANDOM)
  const seed = getDailySeed();
  const target = Math.pow((seed % 10) + 1, 2); // perfect square 1–100

  const complete = () => {
    const d = JSON.parse(localStorage.getItem(today)) || {};
    d.number = true;
    localStorage.setItem(today, JSON.stringify(d));
  };

  const check = () => {
    const n = Number(guess);

    if (n === target) {
      setMsg("🎉 Correct!");
      complete();
    } else if (n < target) {
      setMsg("Guess higher!");
    } else {
      setMsg("Guess lower!");
    }

    setGuess("");
  };

  return (
    <div className="card number-bg">
      <h2>🔢 Number Puzzle</h2>
      <p>Enter today's perfect square between 1–100</p>

      <input
        className="input text-black"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button className="btn" onClick={check}>Submit</button>
      <button className="btn" onClick={goHome}>Back</button>

      <p>{msg}</p>
    </div>
  );
}
