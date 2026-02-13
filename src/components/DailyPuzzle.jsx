import React, { useEffect, useState, useRef } from "react";
import { dbPromise } from "../db";

export default function DailyPuzzle() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

  const timerRef = useRef(null);
  const todayKey = new Date().toISOString().split("T")[0];

  useEffect(() => {
    generateNumber();
    loadStats();
    checkProgress();
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => setTime((t) => t + 0.1), 100);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  const generateNumber = () => {
    const seed = parseInt(todayKey.replace(/-/g, ""));
    setTarget((seed * 37) % 100);
  };

  const loadStats = async () => {
    const db = await dbPromise;
    setStreak((await db.get("stats", "streak")) || 0);
  };

  const checkProgress = async () => {
    const db = await dbPromise;
    const result = await db.get("progress", todayKey);

    if (result) {
      setCompleted(true);
      setMessage("✅ You already played today!");
      stopTimer();
    }
  };

  const logActivity = async (scoreValue) => {
    const db = await dbPromise;
    await db.add("logs", {
      date: todayKey,
      type: "number",
      score: scoreValue,
      time,
    });
  };

  const checkAnswer = async () => {
    if (completed) return;

    const num = parseInt(guess);

    if (num === target) {
      stopTimer();

      const newScore = Math.max(100, Math.floor(1000 - time * 10));
      const newStreak = streak + 1;

      setCompleted(true);
      setScore(newScore);
      setStreak(newStreak);
      setMessage("🎉 Correct!");

      const db = await dbPromise;
      await db.put("progress", true, todayKey);
      await db.put("stats", newStreak, "streak");

      await logActivity(newScore);
    } else {
      setMessage(num > target ? "Too high!" : "Too low!");
    }

    setGuess("");
  };

  return (
    <>
      <h3>🔥 Streak: {streak}</h3>
      <p>⏱ {time.toFixed(1)}s</p>

      {completed ? (
        <p>Score: {score}</p>
      ) : (
        <>
          <input
            className="input text-black"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button className="btn login" onClick={checkAnswer}>Submit</button>
        </>
      )}

      <p>{message}</p>
    </>
  );
}
