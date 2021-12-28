import { input } from "./input";
import { d11Extractor}  from "./common";


const D11P1 = (input) => {
    const grid=d11Extractor(input);
    var count=0;
    for (let step = 1; step <=100 ; step++) {
        count+=makeStep(grid);
    }
    return count;
}

export const makeStep=(grid)=>{
    const flashes=[];
    
    grid.forEach((line,i) => 
        line.forEach((_,j)=>{
            raise(i, j, grid, flashes);
        })
    )
    var count=0;
    while (flashes.length>0){
        const {i,j}=flashes[0];
        count+=flash(i, j, flashes, grid);
        flashes.splice(0, 1);
    }
    raz(grid);
    return count;
    }

const raz=grid=>grid.forEach(line=>
            line.forEach((value, j)=>line[j]=(value>=10)?0:value
        )
    )

const raise=(i, j, grid, flashes)=>{
    grid[i][j]=grid[i][j]+1;
    if (grid[i][j]===10){
        flashes.push({i, j});
    }
}

const flash=(i, j, flashes, grid)=>{
    grid[i][j]=grid[i][j]+1;
    const iMin=Math.max(0, i-1);
    const iMax=Math.min(grid.length-1, i+1);
    const jMin=Math.max(0, j-1);
    const jMax=Math.min(grid[0].length-1, j+1);
    for (let i2 = iMin; i2 <= iMax; i2++) {
        for (let j2 = jMin; j2 <= jMax; j2++) {
            if (!(i2===i && j2===j)){
                raise(i2, j2, grid, flashes)
            }
        }
    }
    return 1;
}


export default D11P1(input);
