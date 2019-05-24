import React from "react";
import { ArenaContext } from "../Base/Layout";
import Warrior from "./WarriorTwo";

export default () => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box page-padding">
          <Warrior context={context} />
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
