import React from "react";
import Btn from "../buttons/Btn";

import doctorImg from "./../../assets/img/doctor.svg";

const Card = props => (
  <div className="history-card">
    <div className="history-card__left">
      <div className="history-card__avatar-holder">
        <img src={doctorImg} alt="" className="history-card__avatar" />
      </div>
    </div>
    <div className="history-card__right">
      <div className="history-card__info-wrap">
        <div className="info">
          <div className="info__heading"> Врач</div>
          <div className="info__content"> Хирург</div>
        </div>
        <div className="info">
          <div className="info__heading"> Сумма</div>
          <div className="info__content"> $1200</div>
        </div>
      </div>

      <span className="history-card__subtitle">Описание проблемы</span>
      <p className="history-card__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>

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

export default Card;
