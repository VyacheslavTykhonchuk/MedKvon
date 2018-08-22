import React from "react";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";
import InputBlock from "../input-block/InputBlock";

let links = [
  {
    name: "Wallet",
    link: "/wallet"
  }
];

const Account = props => (
  <div className="wallet-page main-page wallet">
    <MainNav links={links} />
    <div className="hint">Balance</div>
    <section className="account-card wallet-card card">
      <div className="wallet-card__input-wrap">
        <InputBlock
          heading="Your Balance"
          type="text"
          appearing="no-events"
          value="$ 1423423452"
        />
      </div>
    </section>
    <section className="wallet__btns">
      <button className="wallet__button">
        <div> </div>
        <span>To replenish the balance</span>
      </button>
      <button className="wallet__button">
        <div> </div>
        <span>Создать заявку на вывод</span>
      </button>
    </section>
    <section className="account-card wallet-card card">
      <div> </div>
    </section>
    <FooterNav />
  </div>
);

export default Account;
