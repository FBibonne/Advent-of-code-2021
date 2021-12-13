import { input } from "./input";
import { d8Extractor}  from "./common";

const D8P1 = (input) => d8Extractor(input).filter(combination=>(2 <= combination.length && combination.length <= 4)|| combination.length===7 ).length;


export default D8P1(input);
