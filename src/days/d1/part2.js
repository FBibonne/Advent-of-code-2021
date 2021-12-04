import { input } from "./input";
import { d1Extractor } from "./common";

const D1P2 = (input) => {
  const inputArray = d1Extractor(input);
  const inputArrayLength = inputArray.length;
  return inputArray
    .reduce((acc, v, i, array) => {
      if (i > inputArrayLength - 3) return acc;
      return [...acc, v + array[i + 1] + array[i + 2]];
    }, [])
    .reduce((acc, v, i, array) => {
      if (i === 0) return acc;
      return v > array[i - 1] ? acc + 1 : acc;
    }, 0);
};

export default D1P2(input);
