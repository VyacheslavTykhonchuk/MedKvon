import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import ActiveTickets from "./active-tickets/ActiveTickets";
import HistoryTab from "./history/History";
import MainNav from "../navigation/MainNav";
let links = [
  {
    name: "Dashboard",
    link: "/main/dashboard"
  },
  {
    name: "Active tickets",
    link: "/main/active-tickets"
  },
  {
    name: "History",
    link: "/main/history"
  }
];
const Main = props => (
  <div className="main-page">
    <MainNav links={links} />
    <section className="main-page__section">
      <Switch>
        <Route path="/main/dashboard" component={Dashboard} />
        <Route path="/main/active-tickets" component={ActiveTickets} />
        <Route path="/main/history" component={HistoryTab} />
      </Switch>
    </section>
  </div>
);

export default Main;
