// src/indexedDB.js
import { openDB } from "idb";

const DB_NAME = "dailyPuzzleDB";
const STORE_NAME = "answers";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
}

// save answer
export async function saveAnswer(date, answer) {
  const db = await getDB();
  await db.put(STORE_NAME, answer, date);
}

// get answer
export async function getAnswer(date) {
  const db = await getDB();
  return db.get(STORE_NAME, date);
}
