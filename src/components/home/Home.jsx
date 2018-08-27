import React from "react";
import doctorImg from "./../../assets/img/doctor.svg";
import logo from "./../../assets/img/logo.png";
import Btn from "../buttons/Btn";
import InputBlock from "../input-block/InputBlock";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logPopup: false,
      regPopup: false
    };
  }
  showRegPopup = () => {
    this.setState({
      regPopup: !this.state.regPopup
    });
  };
  showLogPopup = () => {
    this.setState({
      logPopup: !this.state.logPopup
    });
  };
  render() {
    return (
      <div className="home-page">
        <img className="home-page__img" src={doctorImg} alt="img" />
        <Btn
          text={"Create account"}
          appearing={"btn_big btn_blue home-page__btn"}
          action={this.showRegPopup}
        />
        {/* <div className="form-popup form-popup_reg">
        </div> */}
        <Btn
          action={this.showLogPopup}
          text={"Sign in"}
          appearing={"btn_big btn_white home-page__btn"}
        />
        <div className="form-popup form-popup_login">
          <h3 className="form-popup__title">Sign in</h3>
          <InputBlock
          type="email"
          appearing="input-block_centered-transparent"
          placeholder="Email"
        />
         <InputBlock
          type="password"
          appearing="input-block_centered-transparent"
          placeholder="Password"
        />
        <Btn
          linkTo={"/main/dashboard"}
          text={"login"}
          appearing={"btn_small btn_blue"}
        />
        </div>
        <img className="home-page__logo" src={logo} alt="logo" />
      </div>
    );
  }
}
export default Home;
