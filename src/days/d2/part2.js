import { input } from "./input";
import { d2Extractor, PositionWithAim } from "./common";


const D2P2 = (input) => {
    const position=new PositionWithAim()
    d2Extractor(input).forEach(position.move);
    return position.horizontal*position.depth;
};

export default D2P2(input);
