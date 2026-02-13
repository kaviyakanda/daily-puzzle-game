export const getDailySeed = () => {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

export const choosePuzzleType = (seed) => {
  const types = ["number", "math", "word", "logic"];
  return types[seed % types.length];
};
