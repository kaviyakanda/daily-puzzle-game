import React, { useState } from "react";

export default function WordPuzzle({ goHome }) {
  const data = [
    { word: "react", clue: "Frontend library" },
    { word: "logic", clue: "Thinking skill" },
    { word: "piano", clue: "Musical instrument" },
    { word: "happy", clue: "Feeling of joy" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const { word: target, clue } = data[new Date().getDate() % data.length];

  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [msg, setMsg] = useState("");
  const [hintAsked, setHintAsked] = useState(false);

  const complete = () => {
    const d = JSON.parse(localStorage.getItem(today)) || {};
    d.word = true;
    localStorage.setItem(today, JSON.stringify(d));
  };

  const check = () => {
    const a = attempts + 1;
    setAttempts(a);

    if (guess.toLowerCase() === target) {
      setMsg("🎉 Correct!");
      complete();
    } else if (a >= 3 && !hintAsked) {
      const yes = window.confirm("Do you want a hint?");
      if (yes) {
        setMsg(`💡 Hint: starts with "${target[0]}" and ends with "${target[target.length-1]}"`);
        setHintAsked(true);
      } else {
        setMsg("Try again!");
      }
    } else {
      setMsg("Try again!");
    }
    setGuess("");
  };

  return (
    <div className="card blue">
      <h2>🔤 Word Puzzle</h2>
      <p>Enter a {target.length}-letter word related to: {clue}</p>

      <input className="input" value={guess} onChange={e=>setGuess(e.target.value)} />
      <button className="btn" onClick={check}>Submit</button>
      <button className="btn" onClick={goHome}>Back</button>

      <p>Attempts: {attempts}</p>
      <p>{msg}</p>
    </div>
  );
}
