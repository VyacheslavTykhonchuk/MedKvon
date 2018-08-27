import React from "react";
import PropTypes from "prop-types";

const Switch = ({ isActive, onClick, text }) => {
  return (
    <div
      className={isActive ? "switch-block switch-block_active" : "switch-block"}
      onClick={onClick}
    >
      {text ? <h5 className="input-block__heading">{text}</h5> : null}
      <div className="switch-block__switch switch">
        <div className="switch__circle" />
      </div>
    </div>
  );
};

Switch.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default Switch;
