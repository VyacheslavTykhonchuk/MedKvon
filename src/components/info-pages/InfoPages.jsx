import React from "react";
import { Route, Switch } from "react-router-dom";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";

import AboutUs from "./about-us/AboutUs";
import ContactUs from "./contact-us/ContactUs";

let links = [
  {
    name: "About us",
    link: "/info-pages"
  },
  {
    name: "Contact us",
    link: "/info-pages/contact-us"
  }
];

const InfoPage = props => (
  <div className="info-page main-page">
    <MainNav links={links} />
    <section className="main-page__section info-page__section">
      <Switch>
        <Route exact path="/info-pages" component={AboutUs} />
        <Route path="/info-pages/contact-us" component={ContactUs} />
      </Switch>
    </section>
    <FooterNav />
  </div>
);

export default InfoPage;
