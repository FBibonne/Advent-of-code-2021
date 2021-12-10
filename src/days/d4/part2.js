import { input } from "./input";
import { d4Extractor } from "./common";
import {Board} from "./part1";

const D4P1 = (input) => {
const { drawns, tables, size }=d4Extractor(input);
let boards=tables.map(table=>new Board(table, size));
let i=-1;
let lastWinner=null;
while(boards.length>0){
  i++;
  const indice=i;
  const newBoards=[]
  for (const board of boards) {
    board.mark(drawns[indice]);
    if (!board.wins()){
      newBoards.push(board);
    }else{
      lastWinner=board;
    }
  }
  boards=newBoards;
}

return lastWinner.sumOfunmarked()*parseInt(drawns[i],10);

};

export default D4P1(input);
