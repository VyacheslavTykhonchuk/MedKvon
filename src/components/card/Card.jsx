import React from "react";
import PropTypes from "prop-types";

import Btn from "../buttons/Btn";

import doctorImg from "./../../assets/img/doctor.svg";

const Card = ({ doctor, desc, avatar, cost, requestCount }) => (
  <div className="card">
    <div className="card__left">
      <div className="card__avatar-holder">
        <img src={avatar} alt="" className="card__avatar" />
      </div>
    </div>
    <div className="card__right">
      <span className="card__subtitle">Описание проблемы</span>
      <p className="card__text">{desc}</p>
      <div className="card__info-wrap">
        <div className="info">
          <div className="info__heading"> Врач</div>
          <div className="info__content">{doctor}</div>
        </div>
        {cost ? (
          <div className="info">
            <div className="info__heading"> Сумма</div>
            <div className="info__content"> $ {cost}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          requestCount <= 0 ? "card__btns card__btns_disabled" : "card__btns"
        }
      >
        {requestCount ? (
          <div className="request-count">{requestCount}</div>
        ) : (
          ""
        )}
        <Btn
          linkTo={"/main/active-tickets/conference"}
          text={"PROPOSALS OF DOCTORS"}
          appearing={"btn_small btn_blue"}
        />

        <Btn
          linkTo={"/main/active-tickets/conference"}
          text={"Details"}
          appearing={"btn_small btn_transparent"}
        />
      </div>
    </div>
  </div>
);

Card.propTypes = {
  doctor: PropTypes.string,
  desc: PropTypes.string,
  cost: PropTypes.number,
  avatar: PropTypes.string,
  requestCount: PropTypes.number,
  id: PropTypes.number
};
Card.defaultProps = {
  avatar: doctorImg
};

export default Card;
