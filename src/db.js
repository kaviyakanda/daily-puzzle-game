// src/db.js
import { openDB } from "idb";

const DB_NAME = "dailyPuzzleDB";
const DB_VERSION = 1;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // daily completion status
    if (!db.objectStoreNames.contains("progress"))
      db.createObjectStore("progress");

    // streak + stats
    if (!db.objectStoreNames.contains("stats"))
      db.createObjectStore("stats");

    // activity logs
    if (!db.objectStoreNames.contains("logs"))
      db.createObjectStore("logs", { autoIncrement: true });

    // answers storage (merged from indexedDB.js)
    if (!db.objectStoreNames.contains("answers"))
      db.createObjectStore("answers");
  },
});


// -----------------------------
// Helper functions (clean API)
// -----------------------------

export const saveAnswer = async (date, answer) => {
  const db = await dbPromise;
  await db.put("answers", answer, date);
};

export const getAnswer = async (date) => {
  const db = await dbPromise;
  return db.get("answers", date);
};
