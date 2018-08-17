import React from "react";
import { Route } from "react-router-dom";
import "./../../assets/styles/style.css";

import Home from "../home/Home";
import Main from "../main/Main";

const App = props => (
  <main>
    <Route exact path="/" component={Home} />
    <Route path="/main" component={Main} />
  </main>
);
// <Link to="/">Home</Link>
// <Link to="/about-us">About</Link>

export default App;
