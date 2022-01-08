import React from "react";
import "./StackedBar.scss";
const StackedBar = ({ data, sorted = true }) => {
    const total = data?.reduce((sum, a) => (sum += a["value"]), 0);
    if (sorted) data = data.sort((a, b) => (a?.value > b?.value ? -1 : 1));
    return (
        <div className="stackedbar">
            {data.map((dataObj) => {
                const width = (dataObj["value"] / total) * 100;
                const bg = dataObj?.color || `hsl(240, 40%, ${width}%)`;

                return (
                    <div
                        key={dataObj.id}
                        style={{
                            backgroundColor: bg,
                            width: `${width}%`,
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default React.memo(StackedBar);
