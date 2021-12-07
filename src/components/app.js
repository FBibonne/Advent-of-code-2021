import React from "react";
import MaterialTable from "material-table";
import { tableIcons } from "./icons";
import * as D from "../days";

const App = () => {
  const data = Array.from(Array(24)).map((_, i) => ({
    day: `${i + 1}`,
    first: D[`D${i + 1}P1`],
    second: D[`D${i + 1}P2`],
  }));
  return (
    <div style={{ width: "50%", marginLeft: "25%", marginTop: "2em" }}>
      <MaterialTable
        columns={[
          { title: "Day", field: "day", align: "left" },
          {
            title: "First part",
            field: "first",
            type: "numeric",
            align: "center",
          },
          {
            title: "Second part",
            field: "second",
            type: "numeric",
            align: "center",
          },
        ]}
        data={data}
        title="Advent of code 2021"
        icons={tableIcons}
        options={{
          paging: true,
          pageSize: 20,
        }}
      />
    </div>
  );
};

export default App;
