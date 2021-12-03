export const d2Extractor = (input) =>
  input
    .split("\n")
    .map((a) => a.split(" ").map((v, i) => (i === 0 ? v : parseInt(v, 10))));
