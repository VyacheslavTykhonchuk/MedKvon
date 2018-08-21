import React from "react";
import { Route, Switch } from "react-router-dom";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";

import StepOne from "./step-one/StepOne";
import StepTwo from "./step-two/StepTwo";

let links = [
  {
    name: "Create Ticket",
    link: "/create-ticket"
  }
];

const CreateTicket = props => (
  <div className="create-ticket-page main-page">
    <MainNav links={links} />
    <section className="main-page__section info-page__section">
      <Switch>
        <Route path="/create-ticket/1" component={StepOne} />
        <Route path="/create-ticket/2" component={StepTwo} />
      </Switch>
    </section>
    <FooterNav />
  </div>
);

export default CreateTicket;
