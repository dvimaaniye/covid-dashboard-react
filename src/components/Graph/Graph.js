import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Graph = ({
  data = [
    {
      name: "Jan 1",
      total: 4000,
      active: 234,
      recovered: 540,
      deaths: 345,
    },
    {
      name: "Jan 2",
      total: 3000,
      active: 9234,
      recovered: 1540,
      deaths: 405,
    },
    {
      name: "Jan 3",
      total: 22000,
      active: 10234,
      recovered: 1940,
      deaths: 555,
    },
    {
      name: "Jan 4",
      total: 22780,
      active: 9234,
      recovered: 2540,
      deaths: 645,
    },
    {
      name: "Jan 5",
      total: 22890,
      active: 9834,
      recovered: 5540,
      deaths: 845,
    },
    {
      name: "Jan 6",
      total: 27390,
      active: 22234,
      recovered: 5940,
      deaths: 915,
    },
    {
      name: "Jan 7",
      total: 43490,
      active: 30034,
      recovered: 6540,
      deaths: 1145,
    },
  ],
  fields,
}) => {
  return (
    //   ResponsiveContainer width="100%" height="100%"
    <>
      <LineChart width={640} height={340} data={data}>
        {/* {
                  fields.map(field => {
                      return (
                        <Line type="monotone" dataKey={field["dataKey"]} stroke={field["color"]} />
                      );
                  })
              } */}
        <Line type="monotone" dataKey="total" stroke="#888" />
        <Line type="monotone" dataKey="active" stroke="#597bff" />
        <Line type="monotone" dataKey="recovered" stroke="#00bd77" />
        <Line type="monotone" dataKey="deaths" stroke="#ed2121" />
        <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default Graph;
