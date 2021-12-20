import { input } from "./input";
import { d9Extractor}  from "./common";


//your answer is too high. You guessed 24455

const D9P1 = (input) => d9Extractor(input).flatMap((array,i,table)=>array.filter((height,j, line)=>
        (i>0?height<table[i-1][j]:true)
        && (j<line.length-1?height<table[i][j+1]:true)
        && (j>0?height<table[i][j-1]:true)
        && (i<table.length-1?height<table[i+1][j]:true)
    )
).reduce((a,b)=>a+b+1,0);

export default D9P1(input);
