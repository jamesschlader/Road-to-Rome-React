import React from "react";
import { ArenaContext } from "../Base/Layout";
import Arena from "./Arena";

export default () => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box">
          <Arena arenaId={context.ArenaId} warriorId={context.WarriorId} />
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
