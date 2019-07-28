import React from "react";
import { ArenaContext } from "../Base/Layout";
import Arena from "./Arena";

export default ({ location }) => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box">
          <Arena
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
