import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { NumFormatter } from "../../utils";

const Graph = ({ data, fields }) => {
    return (
        <div style={{ width: "95%", height: "340px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={640}
                    height={340}
                    data={data}
                    margin={{
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: -15,
                    }}
                >
                    {fields.map((field) => {
                        return (
                            <Line
                                key={field[0]}
                                type="monotone"
                                dataKey={field[0]}
                                stroke={field[1]}
                            />
                        );
                    })}
                    <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={NumFormatter} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default React.memo(Graph);
