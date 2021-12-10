import { input } from "./input";
import { d5Extractor} from "./common";
import { NoMeetingRoom } from "@material-ui/icons";


const D5P2 = (input) => {
    const lines=/*d5Extractor(input)*/[{
        x1:0, y1:0,
        x2:0, y2:0},
    {   x1:0, y1:0,
        x2:10, y2:10},
        {   x1:1, y1:2,
            x2:-9, y2:-8},
    {   x1:4, y1:2,
        x2:-9, y2:-8},
        {   x1:4, y1:2,
            x2:4, y2:-8}, 
    {   x1:4, y1:-8,
         x2:-9, y2:-8},       
    {   x1:0, y1:0,
        x2:1, y2:0,
        size:u=>u.x2-u.x1
    },
    {
        x1:0, y1:0,
        x2:0, y2:1,
        size:u=>u.y2-u.y1
    },
    {
        x1:0, y1:0,
        x2:1, y2:-1,
        size:u=>u.x2-u.x1
    },
    {
        x1:0, y1:0,
        x2:1, y2:1,
        size:u=>u.x2-u.x1
    },
    {
        x1:0, y1:0,
        x2:-1, y2:1,
        size:u=>u.y2-u.y1
    },
    {
        x1:0, y1:0,
        x2:-1, y2:-1,
        size:u=>u.y1-u.y2
    }];;
    lines.forEach(line=>checkLineAndShowPoints({
        x1 : parseInt(line.x1,10),
        y1 : parseInt(line.y1,10),
        x2 : parseInt(line.x2,10),
        y2 : parseInt(line.y2,10),
    })
    );
 
};

/**
 * check if u is horizontal, vertical or diagonal and then
 * add points of u in diagram
 * 
 * @param {Point} u : vector not null defined by (u.x1, u.y1) -> (u.x2, u.y2)
 */
function checkLineAndShowPoints(u){
    const base=[{
        x1:0, y1:0,
        x2:1, y2:0,
        size:u=>u.x2-u.x1
    },
    {
        x1:0, y1:0,
        x2:-1, y2:0,
        size:u=>u.x1-u.x2
    },
    {
        x1:0, y1:0,
        x2:0, y2:1,
        size:u=>u.y2-u.y1
    },
    {
        x1:0, y1:0,
        x2:0, y2:-1,
        size:u=>u.y1-u.y2
    },
    {
        x1:0, y1:0,
        x2:1, y2:-1,
        size:u=>u.x2-u.x1
    },
    {
        x1:0, y1:0,
        x2:1, y2:1,
        size:u=>u.x2-u.x1
    },
    {
        x1:0, y1:0,
        x2:-1, y2:1,
        size:u=>u.y2-u.y1
    },
    {
        x1:0, y1:0,
        x2:-1, y2:-1,
        size:u=>u.y1-u.y2
    }];
    base.forEach(i=>{
        if(hasSameDirection(u, i)){
            showPoints(u, i);

        }
    });
}

/**
* calc points of u and add in diagram
 * 
 * @param {Point} u : vector not null defined by (u.x1, u.y1) -> (u.x2, u.y2)
 */
function showPoints(u, i){
    console.log("("+u.x1+", "+u.y1+") -> ("+u.x2+", "+u.y2+") avec ("+i.x2+", "+i.y2+")");
    for(let t=0; t<=i.size(u);t++){
        console.log({
            x:u.x1+t*(i.x2-i.x1),
            y:u.y1+t*(i.y2-i.y1)
        });
    }

}

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

/**
 * 
 * two vectors have same direction :
 * - if and only if their cos == 1
 * - which is equivalent to :
 *   1. u.x² (scalar product) = ||u||².||x||² (norms)
 *   2. u.x > 0
 * 
 * (so 0 vector has not the same direction than itself)
 * 
 * @param {Point} u : vector not null defined by (u.x1, u.y1) -> (u.x2, u.y2)
 * @param {Point} v : vector not null defined by (v.x1, v.y1) -> (v.x2, v.y2)
 */
function hasSameDirection(u, v){
    const sp=scalarProduct(u, v);
    return (sp ** 2 === squareNorm(u) * squareNorm(v) )
            && sp > 0 ;
}

/**
 * Compute scalar product between vectors u and v : 
 * 
 * 
 * @param {Point} u : vector not null defined by (u.x1, u.y1) -> (u.x2, u.y2)
 * @param {Point} v : vector not null defined by (v.x1, v.y1) -> (v.x2, v.y2)
 */
const scalarProduct=(u, v)=> (u.x2-u.x1)*(v.x2-v.x1)+(u.y2-u.y1)*(v.y2-v.y1);

/**
 * Compute the square of the euclidian norm of u
 * @param {Point} u 
 */
const squareNorm=u=>(u.x2-u.x1)**2+(u.y2-u.y1)**2;


export default D5P2(input);
