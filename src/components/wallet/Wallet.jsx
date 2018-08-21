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
    <section className="account-card card">
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Your Balance"
          type="text"
          appearing=""
          placeholder=""
        />
      </div>
    </section>
    <FooterNav />
  </div>
);

export default Account;
