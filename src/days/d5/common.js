export const d5Extractor = (input) => input.split("\n")
                                        .map(line=>{
                                            const coords=line.split(" -> ").flatMap(elem=>elem.split(","));
                                            return{
                                                x1:coords[0],
                                                y1:coords[1],
                                                x2:coords[2],
                                                y2:coords[3]
                                            }
                                        });