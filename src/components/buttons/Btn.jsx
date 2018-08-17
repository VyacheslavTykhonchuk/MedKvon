import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Btn = props => (
  <div
    onClick={() => props.changePage(props.linkTo)}
    className={props.appearing ? "btn " + props.appearing : "btn"}
  >
    <span> {props.text}</span>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push(page)
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Btn);
