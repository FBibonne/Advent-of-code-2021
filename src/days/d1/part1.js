import { input } from "./input";
import { d1Extractor } from "./common";

const D1P1 = (input) =>
  d1Extractor(input).reduce((acc, v, i, array) => {
    if (i === 0) return acc;
    return v > array[i - 1] ? acc + 1 : acc;
  }, 0);

export default D1P1(input);
