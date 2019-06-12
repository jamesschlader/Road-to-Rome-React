import React from "react";
import { ArenaContext } from "../Base/Layout";
import Arena from "./Arena";

export default () => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box">
          <Arena
            id={context.ArenaId}
            warriorId={context.WarriorId}
            MONEY_CONVERTER={context.MONEY_CONVERTER}
          />
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
