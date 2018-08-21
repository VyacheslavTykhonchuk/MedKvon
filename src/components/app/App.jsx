import React from "react";
import { Route } from "react-router-dom";
import "./../../assets/styles/style.css";

import Home from "../home/Home";
import Main from "../main/Main";
import Account from "../account/Account";
import InfoPages from "../info-pages/InfoPages";

const App = props => (
  <main>
    <Route exact path="/" component={Home} />
    <Route path="/main" component={Main} />
    <Route path="/account" component={Account} />
    <Route path="/info-pages" component={InfoPages} />
  </main>
);

export default App;
