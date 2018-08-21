import React from "react";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";
import InputBlock from "../input-block/InputBlock";
import Btn from "../buttons/Btn";

import doctorImg from "./../../assets/img/doctor.svg";

let links = [
  {
    name: "Account",
    link: "/account"
  }
];

const Account = props => (
  <div className="account-page main-page">
    <MainNav links={links} />
    <section className="account-card card">
      <div className="account-card__personal-info">
        <img src={doctorImg} alt="" className="account-card__avatar" />
        <div className="account-card__inputs-wrap">
          <InputBlock
            heading="Имя"
            value="Артем"
            type="text"
            appearing=""
            placeholder=""
          />
          <InputBlock
            heading="Фамилия"
            value="Петровский"
            type="text"
            appearing=""
            placeholder=""
          />
        </div>
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Почта"
          value="test@gmail.com"
          type="email"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
        <InputBlock
          heading="Телефон"
          value="+39 099 99 9 9 99"
          type="tel"
          appearing=""
          placeholder=""
        />
        <InputBlock
          heading="Дата"
          value="26. 12. 1992"
          type="text"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
        <InputBlock
          heading="Страна"
          value="Украина"
          type="text"
          appearing=""
          placeholder=""
        />
        <InputBlock
          heading="Язык"
          value="Украинский"
          type="text"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="О себе"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="email"
          appearing="input-block__dashed-border"
          placeholder=""
        />
      </div>
      <Btn text={"СОХРАНИТЬ"} appearing={"btn_small btn_blue"} />
    </section>
    <section className="account-card card">
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Старый пароль"
          type="password"
          appearing="input-block__pass"
          placeholder=""
        />
      </div>
    </section>
    <section className="account-card card">
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Новый пароль"
          type="password"
          appearing="input-block__pass"
          placeholder=""
        />
      </div>
    </section>
    <FooterNav />
  </div>
);

export default Account;
