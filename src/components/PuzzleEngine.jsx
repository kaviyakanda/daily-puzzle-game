import React from "react";
import DailyPuzzle from "./DailyPuzzle";
import MathPuzzle from "./MathPuzzle";
import LogicPuzzle from "./LogicPuzzle";
import WordPuzzle from "./WordPuzzle";

export default function PuzzleEngine({ type }) {
  switch (type) {
    case "number":
      return <DailyPuzzle />;

    case "math":
      return <MathPuzzle />;

    case "logic":
      return <LogicPuzzle />;

    case "word":
      return <WordPuzzle />;

    default:
      return <DailyPuzzle />;
  }
}
