import { input } from "./input";
import { d2Extractor, Position } from "./common";

const D2P1 = (input) => {
    const position=new Position()
    d2Extractor(input).forEach(position.move);
    return position.horizontal*position.depth;
};

export default D2P1(input);
