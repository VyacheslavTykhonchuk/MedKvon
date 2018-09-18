import React from 'react';
import PropTypes from 'prop-types';
class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  toggle = () => {
    this.setState({
      active: !this.state.active,
    });
  };
  render() {
    return (
      <div
        className={
          this.state.active
            ? `${this.props.name} switch-block switch-block_active`
            : `${this.props.name} switch-block`
        }
        onClick={() => {
          this.props.onClick();
          this.toggle();
        }}
      >
        {this.props.text ? (
          <h5 className="input-block__heading">{this.props.text}</h5>
        ) : null}
        <div className="switch-block__switch switch">
          <div className="switch__circle" />
        </div>
      </div>
    );
  }
}

Switch.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Switch;
