import { transpose } from "utils";

export const d4Extractor = (input) => {
  const array = input.split("\n");
  const draw = array[0].split(",");
  const squaresArray = array.slice(2).reduce((acc, l) => {
    if (l === "") return acc;
    return [
      ...acc,
      l
        .replace(/\s{2}/g, " ")
        .split(" ")
        .filter((x) => x !== ""),
    ];
  }, []);
  const squareSize = squaresArray[0].length;
  const lines = squaresArray.reduce((acc, l, i, a) => {
    if (i % squareSize === 0) return [...acc, a.slice(i, i + squareSize)];
    return acc;
  }, []);
  const columns = lines.map((s) => transpose(s));

  return { draw, squareSize, lines, columns };
};
