import React from "react";
import { Route, Switch } from "react-router-dom";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";

import StepOne from "./step-one/StepOne";
import StepTwo from "./step-two/StepTwo";
import StepTicket from "./step-ticket/StepTicket";
import StepDoctors from "./step-doctors/StepDoctors";

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
        <Route exact path="/create-ticket" component={StepOne} />
        <Route path="/create-ticket/specialization" component={StepTwo} />
        <Route path="/create-ticket/doctors" component={StepDoctors} />
        <Route path="/create-ticket/ticket" component={StepTicket} />
      </Switch>
    </section>
    <FooterNav />
  </div>
);

export default CreateTicket;
