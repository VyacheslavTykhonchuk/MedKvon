import React from "react";

class InputBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div
        className={
          this.props.appearing
            ? "input-block " + this.props.appearing
            : "input-block"
        }
      >
        <h5 className="input-block__heading">{this.props.heading}</h5>
        <input
          className="input-block__input"
          type={this.props.type}
          placeholder={this.props.placeholder}
          defaultValue={this.props.value}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default InputBlock;
