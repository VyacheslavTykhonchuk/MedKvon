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
import axios from 'axios';

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
        birthDate: '',
        country: '',
        email: '',
        firstName: '',
        lang: '',
        lastName: '',
        phone: '',
        userInfo: '',
      },
      passwords: {
        oldPass: '',
        newPass: '',
      },
      loading: true,
    };
    this.API_LINK = `https://videodoctor.pp.ua/api_v1/settings`;
    axios.get(this.API_LINK).then((res) => {
      const apiData = res.data.model;
      this.setState({
        type: apiData.type,
        user: {
          birthDate: apiData.birthday,
          country: apiData.country,
          email: apiData.email,
          firstName: apiData.username,
          lang: apiData.lang_id,
          lastName: apiData.lastname,
          phone: apiData.phone,
          userInfo: apiData.about,
          userAvatar: apiData.photo,
        },
        loading: false,
      });
    });
  }

  handleInputChange = (val, name) => {
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
    const formData = this.state.user;

    axios
      .post(this.API_LINK, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // show alert
    this.props.actions.showNotification('Saved!', 'success');
  };

  handleChangePassSubmit = () => {
    const userSubmitedPasswords = JSON.stringify(this.state.passwords);
    if (this.state.passwords.oldPass === this.state.passwords.newPass) {
      // show alert
      this.props.actions.showNotification('Passwords are identical!', 'error');
      return false;
    } else if (
      this.state.passwords.oldPass.length < 8 ||
      this.state.passwords.newPass.length < 8
    ) {
      this.props.actions.showNotification(
        'Passwords must be at least 8 characters in length.',
        'error'
      );
      return false;
    } else {
      // show alert
      this.props.actions.showNotification('Changed!', 'success');
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
            <form action="">
              <section className="account-card card">
                <div className="account-card__personal-info">
                  <UploadPhoto
                    userAvatar={user.userAvatar}
                    name="userAvatar"
                    onChange={this.handleInputChange}
                  />
                  <div className="account-card__inputs-wrap">
                    <InputBlock
                      heading="Имя"
                      value={user.firstName}
                      type="text"
                      appearing=""
                      placeholder=""
                      name="firstName"
                      onChange={this.handleInputChange}
                    />
                    <InputBlock
                      heading="Фамилия"
                      value={user.lastName}
                      type="text"
                      appearing=""
                      placeholder=""
                      name="lastName"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="account-card__inputs-wrap">
                  <InputBlock
                    heading="Почта"
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
                    heading="Телефон"
                    value={user.phone}
                    type="tel"
                    appearing=""
                    placeholder=""
                    name="phone"
                    onChange={this.handleInputChange}
                  />
                  <InputBlock
                    heading="Дата"
                    value={user.birthDate}
                    type="text"
                    appearing=""
                    placeholder=""
                    name="birthDate"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
                  <InputBlock
                    heading="Страна"
                    value={user.country}
                    type="text"
                    appearing=""
                    placeholder=""
                    name="country"
                    onChange={this.handleInputChange}
                  />
                  <InputBlock
                    heading="Язык"
                    value={user.lang}
                    type="text"
                    appearing=""
                    placeholder=""
                    name="lang"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="account-card__inputs-wrap">
                  <InputBlock
                    heading="О себе"
                    value={user.userInfo}
                    type="text"
                    appearing="input-block__dashed-border"
                    placeholder=""
                    name="userInfo"
                    onChange={this.handleInputChange}
                  />
                </div>
                <Btn
                  text={'СОХРАНИТЬ'}
                  appearing={'btn_small btn_blue'}
                  action={this.handleSubmit}
                />
              </section>
            </form>
            <div className="hint">Изменить пароль</div>
            <section className="account-card card">
              <div className="account-card__inputs-wrap">
                <InputBlock
                  heading="Старый пароль"
                  type="password"
                  appearing="input-block__pass"
                  placeholder=""
                  name="oldPass"
                  onChange={this.handleChangePass}
                />
              </div>
            </section>
            <section className="account-card card flex-row">
              <div className="account-card__inputs-wrap">
                <InputBlock
                  heading="Новый пароль"
                  type="password"
                  appearing="input-block__pass"
                  placeholder=""
                  name="newPass"
                  onChange={this.handleChangePass}
                />
              </div>
              <Btn
                text={'Изменить'}
                appearing={'btn_small btn_blue'}
                action={this.handleChangePassSubmit}
              />
            </section>
          </div>
        )}

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
      },
      dispatch
    ),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Account);
