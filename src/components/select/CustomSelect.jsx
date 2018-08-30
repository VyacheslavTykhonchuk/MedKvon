import React from "react";
import PropTypes from "prop-types";
class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      options: this.props.options,
      isOpened: false
    };
    this.showOptions = this.showOptions.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }
  showOptions() {
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  selectOption(selectedOption) {
    this.setState({
      isOpened: !this.state.isOpened,
      selected: selectedOption
    });
  }

  render() {
    return (
      <div
        className={
          this.props.appereance
            ? "custom-select " + this.props.appereance
            : "custom-select"
        }
      >
        <header className="custom-select__header" onClick={this.showOptions}>
          <div className="custom-select__selected">
            {this.state.selected ? this.state.selected : `This month`}
          </div>
          <div className="custom-select__arrow">
            <svg
              width="10"
              height="5"
              viewBox="0 0 10 5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="app" fill="none" fillRule="evenodd" opacity="0.33">
                <g
                  id="Dashboard"
                  transform="translate(-145 -146)"
                  fill="#000"
                  fillRule="nonzero"
                >
                  <path
                    d="M150,149.491117 L146.219362,146.183058 C145.940416,145.938981 145.488155,145.938981 145.209209,146.183058 C144.930264,146.427136 144.930264,146.822864 145.209209,147.066942 L149.494924,150.816942 C149.77387,151.061019 150.22613,151.061019 150.505076,150.816942 L154.790791,147.066942 C155.069736,146.822864 155.069736,146.427136 154.790791,146.183058 C154.511845,145.938981 154.059584,145.938981 153.780638,146.183058 L150,149.491117 Z"
                    id="Shape"
                  />
                </g>
              </g>
            </svg>
          </div>
        </header>
        <section
          className={
            this.state.isOpened
              ? "custom-select__options custom-select__options_opened"
              : "custom-select__options"
          }
        >
          {this.state.options.map(item => (
            <div
              key={item.val}
              onClick={() => this.selectOption(item.val)}
              className={
                this.state.selected === item.val || item.disabled
                  ? "custom-select__option custom-select__option_disabled"
                  : "custom-select__option"
              }
            >
              {item.val}
            </div>
          ))}
        </section>
      </div>
    );
  }
}

CustomSelect.propTypes = {
  selected: PropTypes.string,
  options: PropTypes.array,
  appereance: PropTypes.string
};

export default CustomSelect;
