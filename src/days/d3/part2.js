import { input } from "./input";
import { d3Extractor } from "./common";

const oxygenCriteria = (countOf1, totalCount) => (countOf1 >= totalCount / 2) ? '1' : '0';

const CO2Criteria = (countOf1, totalCount) => (countOf1 >= totalCount / 2) ? '0' : '1';

const D3P2 = (input) => {
    const diagReport=d3Extractor(input);
    return findRateFromDiagReport(diagReport, oxygenCriteria) * findRateFromDiagReport(diagReport,CO2Criteria);
};

export default D3P2(input);

function findRateFromDiagReport(diagReport, criteria) {
    const diagReportColumns = diagReport[0].length;
    let matchingNumbers = diagReport;
    var discardBitPosition = 0;
    while (matchingNumbers.length > 1) {
        let localDiscardBitPosition = discardBitPosition;
        let bitCriteria = findBitCriteria(matchingNumbers, discardBitPosition, criteria);
        matchingNumbers = matchingNumbers.filter((tabValue => tabValue[localDiscardBitPosition] === bitCriteria));
        discardBitPosition++;
        if (discardBitPosition === diagReportColumns && matchingNumbers.length > 1) {
            throw new Error("Encore " + matchingNumbers.length + " mais dernier bit atteint");
        }
    }
    return parseInt(matchingNumbers[0].join(''), 2);
}

function findBitCriteria(numbers, position, criteria){
    const countOf1=numbers.reduce(
        (count, currentNumber)=>count+(currentNumber[position]==='1')
    ,0);
    return criteria(countOf1, numbers.length);
}
