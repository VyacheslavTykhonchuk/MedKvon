import React from "react";
import Btn from "../buttons/Btn";

import doctorImg from "./../../assets/img/doctor.svg";

const Card = props => (
  <div className="card">
    <div className="card__left">
      <div className="card__avatar-holder">
        <img src={doctorImg} alt="" className="card__avatar" />
      </div>
    </div>
    <div className="card__right">
      <span className="card__subtitle">Описание проблемы</span>
      <p className="card__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet.
      </p>
      <div className="card__info-wrap">
        <div className="info">
          <div className="info__heading"> Врач</div>
          <div className="info__content"> Хирург</div>
        </div>
        <div className="info">
          <div className="info__heading"> Сумма</div>
          <div className="info__content"> $1200</div>
        </div>
      </div>
      <div className="card__btns">
        <Btn
          linkTo={"/create-ticket/1"}
          text={"PROPOSALS OF DOCTORS"}
          appearing={"btn_small btn_blue"}
        />
        <Btn
          linkTo={"/main"}
          text={"Details"}
          appearing={"btn_small btn_transparent"}
        />
      </div>
    </div>
  </div>
);

export default Card;
