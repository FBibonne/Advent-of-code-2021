export const d8Extractor = (input) => input.split("\n").map(line=>{
    return {
                    signalPatterns:line.split(" | ")[0].split(" "),
                    digits:line.split(" | ")[1].split(" ")
    }
});

      