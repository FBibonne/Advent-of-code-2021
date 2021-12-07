import { input } from "./input";
import { d1Extractor } from "./common";

const D1P1 = (input) =>
  d1Extractor(input).reduce(
    (prev, current, i, tableau)=>i===0?0:(current>tableau[i-1])+prev
    ,0
  );

  export default D1P1(input);