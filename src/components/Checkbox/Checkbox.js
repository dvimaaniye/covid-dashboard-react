import React from "react";
import "./Checkbox.scss";
const Checkbox = ({ checked = false, onChange = () => {}, children }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </div>
  );
};

export default Checkbox;
