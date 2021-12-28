import { input } from "./input";
import { d11Extractor } from "./common";
import {makeStep} from "./part1";

const D11P2 = (input) => {
    const grid=d11Extractor(input);
    var count=0;
    var step=0;
    while (count<size(grid)){
        step++;
        count=makeStep(grid);
    }
    return step;
}

const size=grid=>grid.length*grid[0].length;


export default D11P2(input);