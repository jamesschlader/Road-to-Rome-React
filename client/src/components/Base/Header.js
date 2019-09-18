import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem } from "react-materialize";
import { ArenaContext } from "./Layout";

export default ({ loggedIn }) => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <>
          <Navbar brand={<Link to="/">Road To Rome</Link>} className="right">
            {loggedIn && (
              <>
                {context.Arena && (
                  <NavItem>
                    <Link to="/arena">
                      <i className="material-icons">account_balance</i>
                    </Link>
                  </NavItem>
                )}

                <NavItem>
                  <Link to="/warrior">
                    <i className="material-icons">person</i>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/account">
                    <i className="material-icons">home</i>
                  </Link>
                </NavItem>
              </>
            )}

            <NavItem href="/">
              <i className="material-icons">exit_to_app</i>
            </NavItem>
          </Navbar>
        </>
      )}
    </ArenaContext.Consumer>
  );
};
