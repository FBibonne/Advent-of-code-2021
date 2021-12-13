import { input } from "./input";
import { d6Extractor} from "../d6/common";

const D7P1 = (input) => {
    const positions=d6Extractor(input);
    const {min, max}=findMinMax(positions);
    var bestConsumption=calcConsumption(positions, min);
    for (let align = min+1; align <=max ; align++) {
        const newConsumption=calcConsumption(positions, align);
        if (newConsumption<bestConsumption){
            bestConsumption=newConsumption;
        }
    }
    return bestConsumption;
}

const calcConsumption=(positions, align)=>positions.reduce((total, current)=>total+Math.abs(current-align),0);

const findMinMax=array=>{
    var min=array[0];
    var max=array[0];
    if (array.length>1){
        for (const value of array) {
            if(value<min){
                min=value;
            }
            if(value > max){
                max=value;
            }
        }
    }
    return {min, max};
}

export default D7P1(input);
