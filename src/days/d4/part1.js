import { input } from "./input";
import { d4Extractor } from "./common";

const D4P1 = (input) => {
    const { drawns, tables, size }=d4Extractor(input);
    const boards=tables.map(table=>new Board(table, size));
    for (const drawn of drawns) {
        for (const board of boards) {
            board.mark(drawn);
            if (board.wins()){
                return board.sumOfunmarked()*parseInt(drawn,10);
            }
        }
    }

};

class Board{

    constructor(table, size){
        this.size=size;
        this.lines = Array.from({length:size}, (v,k)=>new Line());
        this.columns = Array.from({length:size}, (v,k)=>new Column());
        this.numbers=new Map();
        table.forEach((line, i)=> {
            line.forEach((number, j)=>{
                this.numbers.set(number, {
                    line: this.lines[i],
                    column: this.columns[j],
                    mark(){
                        this.line.markedCount++;
                        this.column.markedCount++;
                    }
                })
            })
        });
    }

    mark(number){
        if (this.numbers.has(number)){
            this.numbers.get(number).mark();
            this.numbers.delete(number);
        }
    }

    wins(){
        return this.lines.some(line=>line.markedCount===this.size) || this.columns.some(column=>column.markedCount===this.size);
    }

    sumOfunmarked(){
        let total=0;
        this.numbers.forEach((v,k,map)=>total=total+parseInt(k,10));
        return total;
    }

}

class Line{
    markedCount=0;
}

class Column{
    markedCount=0;
}

export default D4P1(input);
