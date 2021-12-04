import { input } from "./input";
import { d2Extractor } from "./common";

const D2P2 = (input) => {
  const { horizontal, depth } = d2Extractor(input).reduce(
    (acc, [type, value]) => {
      switch (type) {
        case "forward":
          return {
            ...acc,
            depth: acc.depth + acc.aim * value,
            horizontal: acc.horizontal + value,
          };
        case "up":
          return { ...acc, aim: acc.aim - value };
        case "down":
          return { ...acc, aim: acc.aim + value };
        default:
          return acc;
      }
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );
  return horizontal * depth;
};

export default D2P2(input);
