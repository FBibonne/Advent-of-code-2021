import { input } from "./input";
import { d10Extractor } from "./common";
import {isOpening, closing} from "./part1";

const D10P2 = (input) => {
    var scores= d10Extractor(input).map((line,_) => {
        var charQueue=[];
        for (const delimiter of line){
            if (isOpening(delimiter)){
                charQueue.push(delimiter);
            }else if (closing(charQueue.pop())!==delimiter){
                charQueue=[];
                break;
            }
        }
        return score(complete(charQueue));
    });
    scores=scores.filter(score=>score>0)
    scores.sort((a, b) => a - b);
    return scores[Math.floor(scores.length/2)];
}

const complete= charQueue => 
        charQueue.reduceRight( 
            (accumulator, currentValue) => {
                accumulator.push(closing(currentValue))
                return accumulator;
            }
        , [])

const score = charQueue => 
        charQueue.reduce(
            (accumulator, current)=>accumulator*5+points[current],0
        )

const points={")":1,
              "]":2,
              "}":3,
              ">":4}

export default D10P2(input);
