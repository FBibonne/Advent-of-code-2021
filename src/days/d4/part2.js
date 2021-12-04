import { input } from "./input";
import { d4Extractor } from "./common";
import { sumArray } from "utils";

const D4P1 = (input) => {
  const { draw, squareSize, lines, columns } = d4Extractor(input);
  const flattenLines = lines.flat();
  const flattenColumns = columns.flat();
  let bingo = [...Array(lines.length)].map((_, i) => i);
  let squareNumber = null;
  let subDraw = draw.slice(0, squareSize);
  for (let i = squareSize; i < draw.length; i++) {
    for (let j = 0; j < flattenLines.length; j++) {
      const line = flattenLines[j];
      if (hasSubArray(subDraw, line)) {
        bingo = bingo.filter((e) => e !== Math.floor(j / squareSize));
        if (bingo.length === 0) {
          squareNumber = Math.floor(j / squareSize);
          break;
        }
      }
      const column = flattenColumns[j];
      if (hasSubArray(subDraw, column)) {
        bingo = bingo.filter((e) => e !== Math.floor(j / squareSize));
        if (bingo.length === 0) {
          squareNumber = Math.floor(j / squareSize);
          break;
        }
      }
    }
    if (squareNumber !== null) break;
    subDraw = [...subDraw, draw[i]];
  }
  const rest = lines[squareNumber]
    .flat(2)
    .filter((e) => subDraw.indexOf(e) === -1)
    .map((e) => parseInt(e, 10));
  const sum = sumArray(rest);
  return sum * parseInt(subDraw[subDraw.length - 1], 10);
};

function hasSubArray(master, sub) {
  return sub.every((s) => master.indexOf(s) >= 0);
}

export default D4P1(input);
