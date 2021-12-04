import { input } from "./input";
import { d3Extractor } from "./common";
import { transpose } from "../../utils/array";

const D3P2 = (input) => {
  const init = d3Extractor(input);
  const tr = transpose(init.map((a) => a.split("")));
  const { CO2, oxygen } = tr.reduce(
    (acc, _, i) => {
      const trC = transpose(acc.CO2.map((a) => a.split("")))[i];
      const trO = transpose(acc.oxygen.map((a) => a.split("")))[i];

      const oneC = trC.filter((x) => x === "1").length;
      const zeroC = trC.filter((x) => x === "0").length;
      const oneO = trO.filter((x) => x === "1").length;
      const zeroO = trO.filter((x) => x === "0").length;
      let memC,
        memO = [];
      if (oneC >= zeroC)
        memC =
          acc.CO2.length === 1 ? acc.CO2 : acc.CO2.filter((a) => a[i] === "1");
      if (oneC < zeroC)
        memC =
          acc.CO2.length === 1 ? acc.CO2 : acc.CO2.filter((a) => a[i] === "0");
      if (oneO >= zeroO)
        memO =
          acc.oxygen.length === 1
            ? acc.oxygen
            : acc.oxygen.filter((a) => a[i] === "0");
      if (oneO < zeroO)
        memO =
          acc.oxygen.length === 1
            ? acc.oxygen
            : acc.oxygen.filter((a) => a[i] === "1");

      return { CO2: memC, oxygen: memO };
    },
    { CO2: init, oxygen: init }
  );
  return parseInt(CO2[0], 2) * parseInt(oxygen[0], 2);
};

export default D3P2(input);
