import { input } from "./input";
import { d2Extractor } from "./common";

const D2P1 = (input) => {
  const { horizontal, depth } = d2Extractor(input).reduce(
    (acc, [type, value]) => {
      switch (type) {
        case "forward":
          return { ...acc, horizontal: acc.horizontal + value };
        case "up":
          return { ...acc, depth: acc.depth - value };
        case "down":
          return { ...acc, depth: acc.depth + value };
        default:
          return acc;
      }
    },
    { horizontal: 0, depth: 0 }
  );
  return horizontal * depth;
};

export default D2P1(input);
