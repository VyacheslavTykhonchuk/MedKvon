import React from "react";

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.userAvatar || null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  render() {
    return (
      <div className="image-loader">
        <input
          className="image-loader__input"
          type="file"
          onChange={this.handleChange}
        />
        <img
          src={this.state.file}
          alt=""
          className="account-card__avatar image-loader__img"
        />
      </div>
    );
  }
}

export default UploadPhoto;
