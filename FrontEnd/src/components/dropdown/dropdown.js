import React, {useState} from "react";

import "./dropdown.css";

export const Dropdown = ({options, className}) => {

  return (
    <div className="dropdown-container">
      <select className={className}>
        {options.map((option) =>(
            <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};