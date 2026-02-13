import React from "react";

export default function Dashboard({ navigate }) {

  // Simulated completion, in final code we will fetch from IndexedDB
  const completed = {
    word: false,
    math: true,
    logic: true,
    number: true
  };

  return (
    <div className="card">
      <h1 className="mb-6 text-3xl font-bold">🌟 Daily Puzzle Game</h1>
      <p className="mb-6">Today's Challenge</p>

      <button className={`btn ${completed.word ? "completed" : ""}`} onClick={()=>navigate("word")}>
        Word
      </button>
      <button className={`btn ${completed.math ? "completed" : ""}`} onClick={()=>navigate("math")}>
        Math
      </button>
      <button className={`btn ${completed.logic ? "completed" : ""}`} onClick={()=>navigate("logic")}>
        Logic
      </button>
      <button className={`btn ${completed.number ? "completed" : ""}`} onClick={()=>navigate("number")}>
        Number
      </button>
    </div>
  );
}
