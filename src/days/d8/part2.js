import { input } from "./input";
import { d8Extractor } from "./common";

const D8P2 = (input) => {
  const entries = d8Extractor(input);
  return entries.map(processInput).reduce((a, b) => a + b);
};

const processInput = (entry) => {
  entry=decode(entry, "entry")
  const wiresMapping = findWires(entry.signalPatterns);
  console.log("mapping : ")
  console.log(wiresMapping);
  return entry.digits.map(digit=>convert(digit, wiresMapping)).reduce((prev, current, i)=>prev+current*10**(3-i),0);
};

const convert = (signalAsNumber, wiresMapping)=> globalMapSegments[Object.values(mapping).map(bit=>(signalAsNumber&bit)===bit?wiresMapping[bit]:0).reduce((a,b)=>a+b)]


const findWires = (patterns) => {
  globalRefSegmentsString.forEach((v,i)=>console.log("GLOBAL : "+v+" -> "+globalRefSegments[i]));
  const mixed2RefMapping = {};
  var lastLength=Object.keys(mixed2RefMapping).length

  while (Object.keys(mixed2RefMapping).length< 7) {
    const mixedSegments=removeKnownSegments(patterns, Object.keys(mixed2RefMapping)).filter(v=>v!==0);
    const refSegments=removeKnownSegments(globalRefSegments, Object.values(mixed2RefMapping)).filter(v=>v!==0);
    const units = groupSegments(mixedSegments, refSegments);
    console.log(units);
    const checkCombination=searchGoodCombination(units);
    if (checkCombination.checked){
        console.log("OK : ")
        console.log(checkCombination)
        mixed2RefMapping[checkCombination.result.mixedSegments]=checkCombination.result.refSegments;
    }else{
        console.log("KO");
    }
    if (lastLength===Object.keys(mixed2RefMapping).length){
        lastLength=100*(Object.keys(mixed2RefMapping).length+1);
    }else if (lastLength===100*(Object.keys(mixed2RefMapping).length+1)){
        return mixed2RefMapping;
    }else{
        lastLength=Object.keys(mixed2RefMapping).length;
    }
  }
  return mixed2RefMapping;
};

const removeKnownSegments=(array, iterator)=> {
    const removable=Array.from(iterator).map(r=>~r);
    return array.map(value=>{
          removable.forEach(r=>value=value&r)
          return value;
      }
    );
}


/*
unit={
    mixedSegments: [1,3,4],
    refSegments:[5,7,9]
}
*/
const groupSegments=(mixedseg, refseg)=>{
    var units=[];
    var mixedSegments=mixedseg;
    var refSegments=refseg;
    // group by values :
    var mixedSegmentsGroupsByValues={};
    mixedSegments.forEach(n=>{
      mixedSegmentsGroupsByValues=objectAddValue(mixedSegmentsGroupsByValues, n, 1)
    });
    var refSegmentsGroupsByValues={};
    refSegments.forEach(n=>{
      refSegmentsGroupsByValues=objectAddValue(refSegmentsGroupsByValues, n, 1)
    });
    var cardsOfCards={};
    Object.values(mixedSegmentsGroupsByValues).forEach(value=>{
      cardsOfCards=objectAddValue(cardsOfCards, value, 1);
    })
    Array.from(Object.entries(cardsOfCards)).filter(entry=>entry[1]===1)
         .forEach(entry=>{
          Array.from(Object.entries(mixedSegmentsGroupsByValues)).forEach(([k,v])=>{
                if (`${v}`===entry[0]){
                    units =[...units, {mixedSegments:Array.from({length:v}).fill(k), 
                               refSegments:Array.from({length:v}).fill(
                                Array.from(Object.entries(refSegmentsGroupsByValues)).filter(entry=>entry[1]===v)[0][0])
                                }]
                }
            })
    });
    // remove values already in units from segments
    
    units.forEach(unit=>{
        refSegments=refSegments.filter(value=>!unit.refSegments.some(refSegment=>refSegment===value));
        mixedSegments=mixedSegments.filter(value=>!unit.mixedSegments.some(mixedSegment=>mixedSegment===value));
    })
    //group by cards
    var mixedSegmentsGroupsByCards={};
    mixedSegments.forEach(n=>{
      mixedSegmentsGroupsByCards=objectJoinValue(mixedSegmentsGroupsByCards, bitCount(n), n);
    })
    var refSegmentsGroupsByCards= {};
    refSegments.forEach(n=>{
      refSegmentsGroupsByCards=objectJoinValue(refSegmentsGroupsByCards, bitCount(n), n);
    })
    Array.from(Object.entries(mixedSegmentsGroupsByCards)).forEach(([k,v])=>units =[...units,{mixedSegments:v, refSegments:refSegmentsGroupsByCards[k]}])

    return units;
}

const bitCount=(number)=>Object.values(mapping).map(b=>((b&number)===b)?1:0).reduce((x,y)=>x+y);

const objectJoinValue=(object, key, value)=> Object.assign({}, object, {[key]:(object[key] === undefined) ? [value] : [...object[key], value]})

const objectAddValue = (object, key, value) =>  Object.assign({}, object, {[key]:value+((object[key]===undefined)?0:object[key])})

const searchGoodCombination = (units) => {
  var combinations = { old: [], new: [] };
  var checkCombination;
  units.some((unit) => {
    console.log("searchGoodCombination : unit=");
    console.log(unit)
    combinations = searchCombinations(combinations, unit);
    checkCombination=checkCombinations(combinations.new);
    return checkCombination.checked;
  });
  return checkCombination;
};

const searchCombinations = (combinations, unit) => {
  var newCombinations={}
  newCombinations.old = combinations.new;
  const newUnit = { a: unit, op: "INTERSECT_ALL", b: undefined };
  newCombinations.new = [newUnit];
  newCombinations.old.forEach((combination) => {
    newCombinations.new=[...newCombinations.new, 
      { a: combination, op: "INTERSECT", b: newUnit },
      { a: combination, op: "MINUS", b: newUnit },
      { a: newUnit, op: "MINUS", b: combination }]
  });
  return newCombinations;
};

const recursiveCalc = (combination) => {
  var result;
  if(combination.op==="INTERSECT_ALL") {
      result = {
        mixedSegments: combination.a.mixedSegments.reduce(
          (prev, current) => prev & current
        ),
        refSegments: combination.a.refSegments.reduce(
          (prev, current) => prev & current
        ),
      };
  }else{
     var op;
     if(combination.op==="INTERSECT"){
         op=(x,y)=>x&y;
     }
     if(combination.op==="MINUS"){
         op=(x,y)=>x&(~y);
     }
     const a = recursiveCalc(combination.a);
     const b = recursiveCalc(combination.b);
     result={
        mixedSegments:op(a.mixedSegments,b.mixedSegments),
        refSegments:op(a.refSegments, b.refSegments)
      };

  }
  return result;
};

const checkCombinations = (combinationsNew) => {
  var combinationOk=undefined;
  var resultOk=undefined;
  return { checked:combinationsNew.some((combination) => {
    const result = recursiveCalc(combination);
    if (shortHasOnlyOneBit(result.mixedSegments)) {
      combinationOk = combination;
      resultOk = result;
      return true;
    } else {
      return false;
    }
  }), 
  combination:combinationOk, 
  result:resultOk};
};

const shortHasOnlyOneBit = (shortNumber) => {
  return Object.values(mapping).some(v => v === shortNumber);
};

const decode = (entry, msg) => {
    return {
      signalPatterns:entry.signalPatterns.map(decodePattern),
      digits:entry.digits.map(decodePattern)
    }
  };

const mapping = {
  "a":1,
  "b":2,
  "c":4,
  "d":8,
  "e":16,
  "f":32,
  "g":64
};

const decodePattern = (pattern) => Array.from(pattern).reduce((prev, char) => prev + mapping[char],0)

const globalMapSegmentsString ={
  "abcefg":0,
  "cf": 1,
  "acdeg":2,
  "acdfg":3,
  "bcdf":4,
  "abdfg":5,
  "abdefg":6,
  "acf":7,
  "abcdefg":8,
  "abcdfg":9
};

const globalRefSegmentsString  = Object.keys(globalMapSegmentsString);

const globalRefSegments=globalRefSegmentsString.map(decodePattern);

const globalMapSegments=Object.fromEntries(Object.entries(globalMapSegmentsString).map(([k,v]) => [decodePattern(k),v]));


export default D8P2(input);
