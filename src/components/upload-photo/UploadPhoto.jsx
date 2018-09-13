import React from 'react';
import defaultUser from './../../assets/img/user.svg';

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.userAvatar || defaultUser,
    };
    console.log(this.props.userAvatar);
  }

  handleChange = (event) => {
    const imageFile = event.target.files[0];
    this.setState({
      file: URL.createObjectURL(imageFile),
    });

    if (this.props.onChange) {
      this.getBase64(imageFile).then((data) => {
        this.props.onChange(data, this.props.name);
      });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
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
