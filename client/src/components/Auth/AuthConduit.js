import React from "react";
import { ArenaContext } from "../Base/Layout";
import Login from "./Login";

export default ({ location }) => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box page-padding">
          <Login context={context} location={location}></Login>
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
