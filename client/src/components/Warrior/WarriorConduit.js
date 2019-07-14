import React from "react";
import { ArenaContext } from "../Base/Layout";
import Warrior from "./Warrior";

export default ({ location }) => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box page-padding">
          <Warrior context={context} location={location} />
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
