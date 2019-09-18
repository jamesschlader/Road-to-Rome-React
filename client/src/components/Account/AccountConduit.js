import React from "react";
import { ArenaContext } from "../Base/Layout";
import Account from "./Account";

export default ({ location }) => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box">
          <Account
            location={location}
            context={context}
            arena={context.Arena}
            warrior={context.Warrior}
          />
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
