import React from "react";
import PropTypes from "prop-types";

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    const text = this.props.text;
    return (
      <div
        className={
          this.state.isActive
            ? "switch-block switch-block_active"
            : "switch-block"
        }
        onClick={this.handleClick}
      >
        {text ? <h5 className="input-block__heading">{text}</h5> : null}
        <div className="switch-block__switch switch">
          <div className="switch__circle" />
        </div>
      </div>
    );
  }
}

// const Switch = ({ isActive, onClick, text }) => {
//   return (
//     <div
//       className={isActive ? "switch-block switch-block_active" : "switch-block"}
//     >
//       {text ? <h5 className="input-block__heading">{text}</h5> : null}
//       <div className="switch-block__switch switch">
//         <div className="switch__circle" />
//       </div>
//     </div>
//   );
// };

Switch.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default Switch;
