import React from "react";
import "./StackedBar.scss";
const StackedBar = ({ data }) => {
  const total = data.reduce((sum, a) => (sum += a["value"]), 0);

  return (
    <div className="stackedbar">
      {data.map((dataObj) => {
        const width = (dataObj["value"] / total) * 100;
        return (
          <div
            style={{
              backgroundColor: dataObj["color"],
              width: `${width}%`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default StackedBar;
