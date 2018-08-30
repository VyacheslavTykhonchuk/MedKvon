import React from "react";
import PropTypes from "prop-types";

import Btn from "../buttons/Btn";

import doctorImg from "./../../assets/img/doctor.svg";

const HistoryCard = ({ doctor, desc, cost, avatar }) => (
  <div className="history-card">
    <div className="history-card__left">
      <div className="history-card__avatar-holder">
        <img src={avatar} alt="" className="history-card__avatar" />
      </div>
    </div>
    <div className="history-card__right">
      <div className="history-card__info-wrap">
        <div className="info">
          <div className="info__heading"> Врач</div>
          <div className="info__content"> {doctor}</div>
        </div>
        <div className="info">
          <div className="info__heading"> Сумма</div>
          <div className="info__content"> $ {cost}</div>
        </div>
      </div>
      <span className="history-card__subtitle">Описание проблемы</span>
      <p className="history-card__text">{desc}</p>
      <div className="history-card__btns">
        <Btn
          linkTo={"/main"}
          text={"SHOW COMMUNICATION HISTORY"}
          appearing={"btn_small btn_transparent btn_gray-border"}
        />
      </div>
    </div>
  </div>
);

HistoryCard.propTypes = {
  doctor: PropTypes.string.isRequired,
  desc: PropTypes.string,
  cost: PropTypes.number.isRequired,
  avatar: PropTypes.any
};
HistoryCard.defaultProps = {
  avatar: doctorImg
};
export default HistoryCard;
