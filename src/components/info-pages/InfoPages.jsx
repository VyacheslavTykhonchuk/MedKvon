import React from "react";
import { Route, Switch } from "react-router-dom";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";

import AboutUs from "./about-us/AboutUs";
import ContactUs from "./contact-us/ContactUs";

let links = [
  {
    name: "About us",
    link: "/info-pages/about-us"
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
        <Route path="/info-pages/about-us" component={AboutUs} />
        <Route path="/info-pages/contact-us" component={ContactUs} />
      </Switch>
    </section>
    <FooterNav />
  </div>
);

export default InfoPage;
