import React from 'react';

import FooterNav from '../footer-nav/FooterNav';
import MainNav from '../navigation/MainNav';
import InputBlock from '../input-block/InputBlock';
import Btn from '../buttons/Btn';
import UploadPhoto from '../upload-photo/UploadPhoto';
import Preloader from '../preloader/Preloader';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showNotification } from '../../actions/notificationActions';
import { post, get } from 'axios';
import { push } from 'connected-react-router';

let links = [
  {
    name: 'Account',
    link: '/account',
  },
];
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      user: {
        birthday: '',
        country: '',
        email: '',
        username: '',
        lang_id: '',
        lastname: '',
        phone: '',
        about: '',
      },
      passwords: {
        pass1: '',
        pass2: '',
      },
      avatar: '',
      photoFile: '',
      loading: true,
    };
    this.API_LINK = `https://videodoctor.pp.ua/api_v1/settings`;

    get(this.API_LINK).then((res) => {
      const apiData = res.data.model;
      this.setState({
        type: apiData.type,
        user: {
          birthday: apiData.birthday,
          country: apiData.country,
          email: apiData.email,
          username: apiData.username,
          lang_id: apiData.lang_id,
          lastname: apiData.lastname,
          phone: apiData.phone,
          about: apiData.about,
        },
        avatar: apiData.avatar,
        loading: false,
      });
    });
  }

  fileUpload = (file) => {
    const formData = new FormData();
    formData.set('photoFile', file);
  };

  handleInputChange = (val, name) => {
    if (name === 'avatar') {
      this.setState({
        photoFile: val,
      });
    }
    //  copy state
    const updatedUser = { ...this.state.user };
    //  modify copied state
    updatedUser[name] = val;
    // set modified state
    this.setState({
      user: updatedUser,
    });
  };

  handleChangePass = (val, name) => {
    //  copy state
    const passwords = { ...this.state.passwords };
    //  modify copied state
    passwords[name] = val;
    // set modified state
    this.setState({
      passwords: passwords,
    });
  };

  handleSubmit = (dispatch) => {
    // post data to API

    const userForm = document.querySelector('#userForm');
    const formData = new FormData(userForm);

    post(this.API_LINK, formData)
      .then((res) => {
        this.props.actions.showNotification('Saved!', 'success');
      })
      .catch((e) => {
        console.log(e);
        this.props.actions.showNotification('Error!', 'error');
      });
  };
  logout = () => {
    this.props.actions.push('/');
    localStorage.clear();
  };
  handleChangePassSubmit = () => {
    if (this.state.passwords.pass1 !== this.state.passwords.pass2) {
      // show alert
      this.props.actions.showNotification(
        'Passwords are not identical!',
        'error'
      );
      return false;
    } else {
      // show alert
      this.props.actions.showNotification('Changed!', 'success');
      const ChangepasswordForm = this.state.passwords;

      post(this.API_LINK, { ChangepasswordForm })
        .then((res) => {
          this.props.actions.showNotification('Saved!', 'success');
        })
        .catch((e) => {
          console.log(e);
          this.props.actions.showNotification('Error!', 'error');
        });
    }
  };

  render() {
    let user = this.state.user;
    return (
      <div className="account-page main-page">
        <MainNav links={links} />
        {this.state.loading ? (
          <Preloader />
        ) : (
          <div>
            <form action="" id="userForm">
              <section className="account-card card">
                <div className="account-card__personal-info">
                  <UploadPhoto
                    userAvatar={this.state.avatar}
                    name="photoFile"
                    onChange={this.handleInputChange}
                  />
                  <div className="account-card__inputs-wrap">
                    <InputBlock
                      heading="First name"
                      value={user.username}
                      type="text"
                      appearing=""
                      placeholder=""
                      name="username"
                      onChange={this.handleInputChange}
                    />
                    <InputBlock
                      heading="Last name"
                      value={user.lastname}
                      type="text"
                      appearing=""
                      placeholder=""
                      name="lastname"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="account-card__inputs-wrap">
                  <InputBlock
                    heading="Email"
                    value={user.email}
                    type="email"
                    appearing=""
                    placeholder=""
                    name="email"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
                  <InputBlock
                    heading="Phone"
                    value={user.phone}
                    type="tel"
                    appearing=""
                    placeholder=""
                    name="phone"
                    onChange={this.handleInputChange}
                  />
                  <InputBlock
                    heading="Birthday"
                    value={user.birthday}
                    type="text"
                    appearing=""
                    placeholder=""
                    name="birthday"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
                  <InputBlock
                    heading="Country"
                    value={user.country}
                    type="text"
                    appearing=""
                    placeholder=""
                    name="country"
                    onChange={this.handleInputChange}
                  />
                  <InputBlock
                    heading="Language"
                    value={user.lang_id}
                    type="text"
                    appearing=""
                    placeholder=""
                    name="lang_id"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="account-card__inputs-wrap">
                  <InputBlock
                    heading="About"
                    value={user.about}
                    type="text"
                    appearing="input-block__dashed-border"
                    placeholder=""
                    name="about"
                    onChange={this.handleInputChange}
                  />
                </div>
                <Btn
                  text={'SAVE'}
                  appearing={'btn_small btn_blue'}
                  action={this.handleSubmit}
                />
              </section>
            </form>
            <div className="hint">Change password</div>
            <section className="account-card card">
              <div className="account-card__inputs-wrap">
                <InputBlock
                  heading="New password"
                  type="password"
                  appearing="input-block__pass"
                  placeholder=""
                  name="pass1"
                  onChange={this.handleChangePass}
                />
              </div>
            </section>
            <section className="account-card card flex-row">
              <div className="account-card__inputs-wrap">
                <InputBlock
                  heading="Repeat new password"
                  type="password"
                  appearing="input-block__pass"
                  placeholder=""
                  name="pass2"
                  onChange={this.handleChangePass}
                />
              </div>
              <Btn
                text={'Change'}
                appearing={'btn_small btn_blue'}
                action={this.handleChangePassSubmit}
              />
            </section>
          </div>
        )}
        <Btn
          text={'logout'}
          appearing={'btn_small btn_blue btn_logout'}
          action={this.logout}
        />
        <FooterNav />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        showNotification,
        push,
      },
      dispatch
    ),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Account);
