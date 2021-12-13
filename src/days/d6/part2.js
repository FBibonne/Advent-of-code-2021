import { input } from "./input";
import { d6Extractor } from "./common";

const D6P2 = (input) => {
  //Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, while each other number decreases by 1 if it was present at the start of the day.
  
  var fishes = new Map();
  d6Extractor(input).forEach(element => {
    mapAddValue(fishes, element, 1);
  });
  for (let d = 1; d <= 256; d++) {
    let adds = 0;
    const newFishes = new Map();
    for (const [key, value] of fishes.entries()) {
      if (key === 0) {
        adds=adds+value;
        mapAddValue(newFishes, 6, value);
      } else {
        mapAddValue(newFishes, key-1, value);
      }
    }
    if (adds > 0) {
      mapAddValue(newFishes, 8, adds);
    }
    fishes=newFishes;
  }
  return Array.from(fishes.values()).reduce((a,b)=>a+b);
};

export default D6P2(input);

function mapAddValue(map, key, value) {
  var count = map.get(key);
  count = (count === undefined) ? value : count + value;
  map.set(key, count);
}

