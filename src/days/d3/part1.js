import { input } from "./input";
import { d3Extractor } from "./common";

const D3P1 = (input) => {
    const diagReport=d3Extractor(input);
    const diagReportLines=diagReport.length;
    const diagReportColumns=diagReport[0].length;
    const bit1Count=diagReport.reduce(
        (previousTab, currentTab)=>previousTab.map(
            (value, i)=>value+(currentTab[i]==='1')
        )
    ,Array(diagReportColumns).fill(0));
    const gammaRateBinary=bit1Count.map(countOf1=>(countOf1>diagReportLines/2)?'1':'0').join('');
    console.log(gammaRateBinary)
    const epsilonRateBinary=bit1Count.map(countOf1=>(countOf1>diagReportLines/2)?'0':'1').join('');
    console.log(epsilonRateBinary)
    return parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2);
};

export default D3P1(input);
