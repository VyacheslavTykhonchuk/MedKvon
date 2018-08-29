import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = props => (
  <nav className="main-nav">
    {props.links.map(function(item, index) {
      return (
        <NavLink
          exact
          activeClassName="main-nav__item_active"
          key={index}
          to={item.link}
          className="main-nav__item"
        >
          {item.name}
        </NavLink>
      );
    })}
  </nav>
);

export default MainNav;
