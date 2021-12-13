import { input } from "./input";
import { d6Extractor} from "./common";

const D6P1 = (input) => {
    //Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, while each other number decreases by 1 if it was present at the start of the day.
    const fishes=d6Extractor(input);
    for (let d = 1; d <= 80; d++) {
        let adds=0;
        for (let f = 0; f < fishes.length; f++) {
            if(fishes[f]===0){
                adds++;
                fishes[f]=6;
            }else{
                fishes[f]=fishes[f]-1
            }
        }
        if (adds>0){
            Array.prototype.push.apply(fishes, (new Array(adds)).fill(8));
        }
    }
    return fishes.length;
}

export default D6P1(input);
