import { input } from "./input";
import { d4Extractor } from "./common";
import { sumArray } from "utils";

const D4P1 = (input) => {
};

function hasSubArray(master, sub) {
  return sub.every((s) => master.indexOf(s) >= 0);
}

export default D4P1(input);
