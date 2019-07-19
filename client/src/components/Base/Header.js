import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem } from "react-materialize";

export default () => {
  return (
    <Navbar brand={<Link to="/">Road To Rome</Link>} className="right">
      <NavItem href="/arena">
        <i className="material-icons">account_balance</i>
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
