import React from "react";
import "./Checkbox.scss";
const Checkbox = ({ checked = false, onChange = () => {}, name, children }) => {
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={name}>{children}</label>
        </div>
    );
};

export default React.memo(Checkbox);
