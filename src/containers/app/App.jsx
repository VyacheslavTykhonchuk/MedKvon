import React from "react";
import { Route } from "react-router-dom";
import "./../../assets/styles/style.css";

import Home from "../home/Home";
import About from "../about/About";

const App = props => (
  <main>
    <Route exact path="/" component={Home} />
    <Route exact path="/about-us" component={About} />
  </main>
);
// <Link to="/">Home</Link>
// <Link to="/about-us">About</Link>

export default App;
