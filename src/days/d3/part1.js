import { input } from "./input";
import { d3Extractor } from "./common";
import { transpose } from "../../utils/array";

const D3P1 = (input) => {
  const { gamma, epsilon } = transpose(
    d3Extractor(input).map((a) => a.split(""))
  ).reduce(
    (acc, l) => {
      const one = l.filter((x) => x === "1").length;
      const zero = l.filter((x) => x === "0").length;
      if (one > zero)
        return { gamma: acc.gamma + "1", epsilon: acc.epsilon + "0" };
      return { gamma: acc.gamma + "0", epsilon: acc.epsilon + "1" };
    },
    { gamma: "", epsilon: "" }
  );
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

export default D3P1(input);
