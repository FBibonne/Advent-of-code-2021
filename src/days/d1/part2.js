import { input } from "./input";
import { d1Extractor } from "./common";

const D1P2 = (input) => 
  d1Extractor(input).map((value, i, tableau)=> (i===0 || i===tableau.length-1)?null:tableau[i-1]+value+tableau[i+1])
  .filter(value=>value!=null)
  .reduce(
    (prev, current, i, tableau)=>i===0?0:(current>tableau[i-1])+prev
    ,0
  );

export default D1P2(input);
