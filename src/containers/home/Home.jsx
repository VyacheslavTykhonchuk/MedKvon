import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import doctorImg from "./../../assets/img/doctor.svg";
import logo from "./../../assets/img/logo.png";

const Home = props => (
  <div className="home-page">
    <img src={doctorImg} alt="Logo" />
    <img src={logo} alt="Logo" />
  </div>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/about-us")
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Home);
