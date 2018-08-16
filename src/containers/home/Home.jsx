import React from "react";
import doctorImg from "./../../assets/img/doctor.svg";
import logo from "./../../assets/img/logo.png";
import Btn from "../buttons/Btn";

const Home = props => (
  <div className="home-page">
    <img className="home-page__img" src={doctorImg} alt="img" />
    <Btn
      linkTo={"/about-us"}
      text={"Create account"}
      appearing={"btn_big btn_blue home-page__btn"}
    />
    <Btn
      linkTo={"/about-us"}
      text={"Sign in"}
      appearing={"btn_big btn_white home-page__btn"}
    />
    <img className="home-page__logo" src={logo} alt="logo" />
  </div>
);

export default Home;
