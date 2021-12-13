export const d8Extractor = (input) => input.split("\n").map(line=>line.split(" | ")[1]).flatMap(elem=>elem.split(" ")
    );