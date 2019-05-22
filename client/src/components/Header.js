import React from "react";
import { Navbar, NavItem } from "react-materialize";

export default () => {
  return (
    <Navbar brand={<a href="/">Road To Rome</a>} alignlinks="right">
      <NavItem href="/market">
        <i className="material-icons">shopping_cart</i>
      </NavItem>
      <NavItem href="/arena">
        <i className="material-icons">account_balance</i>
      </NavItem>
      <NavItem href="/ludus-magnus">
        <img
          className="nav-equip"
          src="/img/erics-images/nav-equipment.svg"
          alt="ludus-magnus"
        />
      </NavItem>
      <NavItem href="/warrior">
        <i className="material-icons">person</i>
      </NavItem>
      <NavItem href="/">
        <i className="material-icons">home</i>
      </NavItem>
      <NavItem href="/">
        <i className="material-icons">exit_to_app</i>
      </NavItem>
    </Navbar>
  );
};
