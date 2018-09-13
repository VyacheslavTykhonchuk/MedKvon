import React from 'react';
import doctorImg from './../../assets/img/doctor.svg';
import logo from './../../assets/img/logo.png';
import Btn from '../buttons/Btn';
import InputBlock from '../input-block/InputBlock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showNotification } from '../../actions/notificationActions';
import { setUserToken } from '../../actions/userActions';
import { push } from 'connected-react-router';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logPopup: false,
      regPopup: false,
      login: {
        email: '',
        password: '',
      },
      reg: {},
    };
    this.icons = {
      facebook: `<svg xmlns='http://www.w3.org/2000/svg' id='Capa_1' width='60.734' height='60.733'
      viewBox='0 0 60.734 60.733'>
          <path d='M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914 v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462 v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z'
          />
      </svg>`,
      twitter: `<svg xmlns='http://www.w3.org/2000/svg' id='Capa_1' viewBox='0 0 612 612'>
      <path d='M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411 c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513 c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101 c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104 c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194 c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485 c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z'
      fill='#010002' />
      </svg>`,
      instagram: `<svg id='Layer_1' xmlns='http://www.w3.org/2000/svg' width='169.063' height='169.063'
      viewBox='0 0 169.063 169.063'>
          <path d='M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752 c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407 c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752 c17.455,0,31.656,14.201,31.656,31.655V122.407z'
          />
          <path d='M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561 C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561 c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z'
          />
          <path d='M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78 c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78 C135.661,29.421,132.821,28.251,129.921,28.251z'
          />
      </svg>`,
      linkedin: `<svg xmlns='http://www.w3.org/2000/svg' id='Capa_1' width='430.117' height='430.118'
      viewBox='0 0 430.117 430.118'>
          <path id='LinkedIn__x28_alt_x29_' d='M398.355,0H31.782C14.229,0,0.002,13.793,0.002,30.817v368.471 c0,17.025,14.232,30.83,31.78,30.83h366.573c17.549,0,31.76-13.814,31.76-30.83V30.817C430.115,13.798,415.904,0,398.355,0z M130.4,360.038H65.413V165.845H130.4V360.038z M97.913,139.315h-0.437c-21.793,0-35.92-14.904-35.92-33.563 c0-19.035,14.542-33.535,36.767-33.535c22.227,0,35.899,14.496,36.331,33.535C134.654,124.415,120.555,139.315,97.913,139.315z M364.659,360.038h-64.966V256.138c0-26.107-9.413-43.921-32.907-43.921c-17.973,0-28.642,12.018-33.327,23.621 c-1.736,4.144-2.166,9.94-2.166,15.728v108.468h-64.954c0,0,0.85-175.979,0-194.192h64.964v27.531 c8.624-13.229,24.035-32.1,58.534-32.1c42.76,0,74.822,27.739,74.822,87.414V360.038z M230.883,193.99 c0.111-0.182,0.266-0.401,0.42-0.614v0.614H230.883z'
          />
      </svg>`,
      vk: `<svg xmlns='http://www.w3.org/2000/svg' id='Capa_1' viewBox='0 0 14.171 14.171'>
      <path d='M13.268,0H0.905C0.405,0,0,0.405,0,0.904v12.363c0,0.499,0.405,0.904,0.905,0.904h12.362 c0.499,0,0.904-0.405,0.904-0.904V0.904C14.172,0.404,13.767,0,13.268,0z M11.755,8.635c0.259,0.264,0.821,0.707,0.719,1.158 c-0.094,0.414-0.712,0.263-1.312,0.287c-0.685,0.029-1.091,0.044-1.503-0.287C9.465,9.636,9.351,9.45,9.165,9.242 C8.996,9.054,8.783,8.717,8.493,8.73C7.972,8.756,8.135,9.482,7.95,9.977c-2.896,0.456-4.059-1.333-5.085-3.069 C2.368,6.067,1.65,4.261,1.65,4.261l2.048-0.007c0,0,0.657,1.195,0.831,1.503c0.148,0.262,0.311,0.47,0.479,0.704 c0.141,0.194,0.364,0.574,0.608,0.543c0.397-0.051,0.469-1.591,0.223-2.107C5.741,4.688,5.506,4.615,5.263,4.544 C5.345,4.026,7.56,3.918,7.918,4.32c0.52,0.584-0.36,2.21,0.352,2.684c1-0.524,1.854-2.718,1.854-2.718l2.398,0.015 c0,0-0.375,1.186-0.768,1.712c-0.229,0.308-0.989,0.994-0.959,1.503C10.819,7.919,11.437,8.311,11.755,8.635z'
      fill='#030104' />
  </svg>`,
    };
    this.doctor = React.createRef();
    this.patient = React.createRef();
    this.translator = React.createRef();
  }
  
  showRegPopup = (e) => {
    e.stopPropagation();
    this.setState({
      regPopup: true,
    });
  };

  showLogPopup = (e) => {
    e.stopPropagation();
    this.setState({
      logPopup: true,
    });
  };

  hidePopups = () => {
    this.setState({
      logPopup: false,
      regPopup: false,
    });
  };

  handleLoginInputChange = (val, name) => {
    //  copy state
    const loginForm = { ...this.state.login };
    //  modify copied state
    loginForm[name] = val;
    // set modified state
    this.setState({
      login: loginForm,
    });
  };

  handleRegInputChange = (val, name) => {
    //  copy state
    const regForm = { ...this.state.reg };
    //  modify copied state
    regForm[name] = val;
    // set modified state
    this.setState({
      reg: regForm,
    });
  };

  proceedLogin = () => {
    // post data to API
    const login = this.state.login;
    axios
      .post(`https://videodoctor.pp.ua/api_v1/login`, { login })
      .then((res) => {
        const data = res.data;
        if (data.error) {
          // show alert
          let obj = data.validation;
          this.props.actions.showNotification(
            obj[Object.keys(obj)[0]],
            'error'
          );
        } else {
          const userToken = data['user-token'];
          axios.defaults.headers.common['user-token'] = userToken;
          this.props.actions.setUserToken(userToken);

          // LStorage
          localStorage.setItem('user-token', userToken);

          // show alert
          this.props.actions.showNotification('Welcome!', 'success');
          this.props.actions.changePage('/main');
        }
      });
  };
  proceedReg = (e) => {
    e.stopPropagation();
    // post data to API
    const reg = this.state.reg;

    axios
      .post(`https://videodoctor.pp.ua/api_v1/signup`, { reg })
      .then((res) => {
        const data = res.data;
        if (data.error) {
          // show alert
          let obj = data.validation;
          this.props.actions.showNotification(
            obj[Object.keys(obj)[0]],
            'error'
          );
        } else {
          const userToken = data['user-token'];
          axios.defaults.headers.common['user-token'] = userToken;
          this.props.actions.setUserToken(userToken);

          // LStorage
          localStorage.setItem('user-token', userToken);

          // show alert
          this.props.actions.showNotification('Welcome!', 'success');
          this.props.actions.changePage('/main');
        }
      });
  };
  radioBtns = type => {
    //  copy state
    const regForm = { ...this.state.reg };
    //  modify copied state
    regForm["type"] = type;
    // set modified state
    this.setState({
      reg: regForm
    });

    switch (type) {
      case 10:
        this.doctor.current.classList.remove("radio-block_active");
        this.patient.current.classList.remove("radio-block_active");
        this.translator.current.classList.remove("radio-block_active");
        this.patient.current.classList.add("radio-block_active");
        break;
      case 20:
        this.doctor.current.classList.remove("radio-block_active");
        this.patient.current.classList.remove("radio-block_active");
        this.translator.current.classList.remove("radio-block_active");
        this.doctor.current.classList.add("radio-block_active");
        break;
      case 30:
        this.doctor.current.classList.remove("radio-block_active");
        this.patient.current.classList.remove("radio-block_active");
        this.translator.current.classList.remove("radio-block_active");
        this.translator.current.classList.add("radio-block_active");
        break;
      default:
        break;
    }
 
  };

  render() {
    return (
      <div
        onClick={this.hidePopups}
        className={
          this.state.regPopup
            ? 'home-page popup-opened popup-opened_reg'
            : this.state.logPopup
              ? 'home-page popup-opened popup-opened_log'
              : 'home-page'
        }
      >
        <img className="home-page__img" src={doctorImg} alt="img" />
        <Btn
          text={'Create account'}
          appearing={'btn_big btn_blue home-page__btn'}
          action={this.state.regPopup ? this.proceedReg : this.showRegPopup}
        />
        <Btn
          action={this.showLogPopup}
          text={'Sign in'}
          appearing={'btn_big btn_white home-page__btn'}
        />
        <form
          className="form-popup form-popup_reg"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="form-popup__title">Create account</h3>
          <InputBlock
            type="text"
            appearing="input-block_centered-transparent"
            placeholder="Name"
            onChange={this.handleRegInputChange}
            name="username"
          />
          <InputBlock
            type="text"
            appearing="input-block_centered-transparent"
            placeholder="Last Name"
            onChange={this.handleRegInputChange}
            name="lastname"
          />
          <InputBlock
            type="tel"
            appearing="input-block_centered-transparent"
            placeholder="Phone"
            onChange={this.handleRegInputChange}
            name="phone"
          />
          <InputBlock
            type="text"
            appearing="input-block_centered-transparent"
            placeholder="Date"
            onChange={this.handleRegInputChange}
            name="birthday"
          />
          <InputBlock
            type="text"
            appearing="input-block_centered-transparent"
            placeholder="Country"
            onChange={this.handleRegInputChange}
            name="country"
          />
          <InputBlock
            type="password"
            appearing="input-block_centered-transparent"
            placeholder="Password"
            onChange={this.handleRegInputChange}
            name="password"
          />
          <InputBlock
            type="password"
            appearing="input-block_centered-transparent"
            placeholder="Repeat password"
            onChange={this.handleRegInputChange}
            name="passwordrepeat"
          />
          <InputBlock
            type="email"
            appearing="input-block_centered-transparent"
            placeholder="Email"
            name="email"
            onChange={this.handleRegInputChange}
          />
          <div className="radio-wrap">
            <div
              className="radio-block"
              onClick={() => this.radioBtns(20)}
              ref={this.doctor}
            >
              doctor
            </div>
            <div
              className="radio-block"
              onClick={() => this.radioBtns(10)}
              ref={this.patient}
            >
              patient
            </div>
            <div
              className="radio-block"
              onClick={() => this.radioBtns(30)}
              ref={this.translator}
            >
              translator
            </div>
          </div>
        </form>
        <form
          className="form-popup form-popup_login"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="form-popup__title">Sign in</h3>

          <InputBlock
            type="email"
            appearing="input-block_centered-transparent"
            placeholder="Email"
            name="email"
            onChange={this.handleLoginInputChange}
          />
          <InputBlock
            type="password"
            appearing="input-block_centered-transparent"
            placeholder="Password"
            name="password"
            onChange={this.handleLoginInputChange}
          />
          <div className="social-login">
            <header className="social-login__heading">Sign in with:</header>
            <div className="social-login__items">
              <a
                href=""
                className="social-login__item"
                dangerouslySetInnerHTML={{ __html: this.icons.facebook }}
              />
              <a
                href=""
                className="social-login__item"
                dangerouslySetInnerHTML={{ __html: this.icons.twitter }}
              />
              <a
                href=""
                className="social-login__item"
                dangerouslySetInnerHTML={{ __html: this.icons.instagram }}
              />
              <a
                href=""
                className="social-login__item"
                dangerouslySetInnerHTML={{ __html: this.icons.linkedin }}
              />
              <a
                href=""
                className="social-login__item"
                dangerouslySetInnerHTML={{ __html: this.icons.vk }}
              />
            </div>
          </div>
          <Btn
            text={'login'}
            appearing={'btn_small btn_blue'}
            action={this.proceedLogin}
          />
        </form>
        <img className="home-page__logo" src={logo} alt="logo" />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        showNotification,
        setUserToken,
        changePage: (page) => push(page),
      },
      dispatch
    ),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
