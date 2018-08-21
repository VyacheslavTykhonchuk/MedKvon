import React from "react";

const InputBlock = props => (
  <div
    className={
      props.appearing ? "input-block " + props.appearing : "input-block"
    }
  >
    <h5 className="input-block__heading">{props.heading}</h5>
    <input
      className="input-block__input"
      type={props.type}
      placeholder={props.placeholder}
      defaultValue={props.value}
    />
  </div>
);

export default InputBlock;
