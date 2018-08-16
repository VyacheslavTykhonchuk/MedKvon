import React from "react";
import { Route, Link } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import ActiveTickets from "./active-tickets/ActiveTickets";
import HistoryTab from "./history/History";

const Main = props => (
  <div className="main-page">
    <header>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/active-tickets">Active tickets</Link>
      <Link to="/history">History</Link>
    </header>
    <section>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/active-tickets" component={ActiveTickets} />
      <Route exact path="/history" component={HistoryTab} />
    </section>
  </div>
);

export default Main;
