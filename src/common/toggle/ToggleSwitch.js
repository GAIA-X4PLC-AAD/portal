
import React from "react";
import "./ToggleSwitch.css";
import PropTypes from 'prop-types';
  
export const ToggleSwitch = ({ label, onChange, defaultChecked }) => {
  return (
    <div className="container">
      
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" 
               name={label} id={label} onChange={onChange} defaultChecked={defaultChecked} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
      {label}{" "}
    </div>
  );
};

ToggleSwitch.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool
};
  