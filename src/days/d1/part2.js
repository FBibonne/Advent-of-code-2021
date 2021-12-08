import { input } from "./input";
import { d1Extractor } from "./common";

const D1P2 = (input) => {
  const tabInput=d1Extractor(input);
  const pt= Array(tabInput.length-2);
  const mapper = (_,i)=>tabInput[i]+tabInput[i+1]+tabInput[i+2];
  for (let index = 0; index < pt.length; index++) {
    pt[index]=mapper(pt[index], index);
  }
  // Not working ! pt.map(mapper);
  return pt.reduce(
    (prev, current, i)=>i===0?0:(current>pt[i-1])+prev
    ,0
  );
  }

export default D1P2(input);
