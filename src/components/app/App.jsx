import React from "react";
import { Route } from "react-router-dom";
import "./../../assets/styles/style.css";

import Home from "../home/Home";
import Main from "../main/Main";
import Account from "../account/Account";
import InfoPages from "../info-pages/InfoPages";
import CreateTicket from "../create-ticket/CreateTicket";
import Wallet from "../wallet/Wallet";

const App = props => (
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/main" component={Main} />
      <Route path="/account" component={Account} />
      <Route path="/info-pages" component={InfoPages} />
      <Route path="/create-ticket" component={CreateTicket} />
      <Route path="/wallet" component={Wallet} />
    </main>
);

export default App;
