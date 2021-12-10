import { input } from "./input";
import { d5Extractor} from "./common";

const D5P1 = (input) => {
    const lines=d5Extractor(input);
    const diagram=new Map();
    lines.forEach(line => {
        if(line.x1 === line.x2){
            addPoints(diagram, line.x1, line.y1, line.y2, (a, b)=>a+"_"+b);
        }else if (line.y1===line.y2){
            addPoints(diagram, line.y1, line.x1, line.x2, (a, b)=>b+"_"+a);
        }
    });
    return Array.from(diagram.values()).filter(c=>c>1).length;

};

function addPoints(map, x, y1, y2, makePoint){
    const start=Math.min(parseInt(y1,10), parseInt(y2,10))
    const end=Math.max(parseInt(y1,10), parseInt(y2,10));
    // Array.from({length:(end-start+1)}, (v,k)=>k+start).forEach : c'est moche !
    for (let y = start; y <= end ; y++) {
        const point=makePoint(parseInt(x,10),y);
        var count=map.get(point);
        if (count!==undefined){
            console.log(point+" : "+count);
        }
        count=count===undefined?1:count+1;
        map.set(point, count);
        
    }
    return map;
}

export default D5P1(input);
