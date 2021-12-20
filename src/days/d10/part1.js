import { input } from "./input";
import { d10Extractor}  from "./common";


const D10P1 = (input) => d10Extractor(input).map((line,_) => {
    var charQueue=[];
    var illegalChar=null;
    for (const delimiter of line){
        if (isOpening(delimiter)){
            charQueue.push(delimiter);
        }else if (closing(charQueue.pop())!==delimiter){
            illegalChar=delimiter;
            break;
        }
    }
    return score(illegalChar);
}).reduce((a,b)=>a+b);

const isOpening=(delimiter)=> "([{<".includes(delimiter)

const delimiterPairs=[{opening:"(", closing:")"},
                      {opening:"[", closing:"]"},
                      {opening:"{", closing:"}"},
                      {opening:"<", closing:">"},
]

const closing=(delimiter)=>{
    const pair=delimiterPairs.filter(({opening})=>opening===delimiter)[0];
    return pair===undefined?undefined:pair.closing;
}

const delimiterScore=[{delimiter:")", points:3},
                      {delimiter:"]", points:57},
                      {delimiter:"}", points:1197},
                      {delimiter:">", points:25137},
]

const score=illegalChar=>{
    const pair=delimiterScore.filter(({delimiter})=>delimiter===illegalChar)[0];
    return pair===undefined?0:pair.points;
}

export default D10P1(input);
