import { openDB } from "idb";

export const dbPromise = openDB("dailyPuzzleDB", 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("progress"))
      db.createObjectStore("progress");

    if (!db.objectStoreNames.contains("stats"))
      db.createObjectStore("stats");

    if (!db.objectStoreNames.contains("logs"))
      db.createObjectStore("logs", { autoIncrement: true });
  },
});
