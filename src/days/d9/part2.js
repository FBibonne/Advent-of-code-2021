import { input } from "./input";
import { d9Extractor } from "./common";

const D9P2 = (input) => {
    var map=d9Extractor(input);
    var lows=d9Extractor(input).flatMap(
                (array,i,table)=>
                        array.map((value, j) => {return {value, i, j}})
                        .filter((height,_, line)=>
                                        (height.i>0?height.value<table[height.i-1][height.j]:true)
                                        && (height.j<line.length-1?height.value<table[height.i][height.j+1]:true)
                                        && (height.j>0?height.value<table[height.i][height.j-1]:true)
                                        && (height.i<table.length-1?height.value<table[height.i+1][height.j]:true)
                                    )
                )
    console.log(lows);
    lows=lows.map(low=>bassinScan(low, map))
    lows.sort((a,b)=>b-a);
    console.log(lows);
    return lows[0]*lows[1]*lows[2];
}

const bassinScan=(start, map)=>{
    const length=map[0].length;
    const height=map.length;
    var retour=1;
    map[start.i][start.j]=null;
    if (start.i>0 && map[start.i-1][start.j]!==null && map[start.i-1][start.j]!==9){
      retour+=bassinScan({i:start.i-1, j:start.j}, map)
    }
    if (start.j<length-1 && map[start.i][start.j+1]!==null && map[start.i][start.j+1]!==9){
        retour+=bassinScan({i:start.i, j:start.j+1}, map);
    }
    if (start.j>0 && map[start.i][start.j-1]!=null && map[start.i][start.j-1]!==9){
        retour+=bassinScan({i:start.i, j:start.j-1}, map);
    }
    if (start.i<height-1 && map[start.i+1][start.j]!=null && map[start.i+1][start.j]!==9){
        retour+=bassinScan({i:start.i+1, j:start.j}, map);
    }
    //console.log(`${start.i},${start.i}->${retour}`);
    return retour;
}

export default D9P2(input);
