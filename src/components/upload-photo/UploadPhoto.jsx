import React from 'react';
import defaultUser from './../../assets/img/user.svg';

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.userAvatar || defaultUser,
    };
  }

  handleChange = (event) => {
    const imageFile = event.target.files[0];
    if (this.props.onChange) {
      this.props.onChange(imageFile, this.props.name);
    }
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  render() {
    return (
      <div className="image-loader">
        <input
          className="image-loader__input"
          type="file"
          onChange={this.handleChange}
          name={this.props.name}
          accept="image/*"
        />
        <img
          src={this.state.file}
          default-src={this.props.userAvatar}
          alt=""
          className="account-card__avatar image-loader__img"
        />
      </div>
    );
  }
}

export default UploadPhoto;
