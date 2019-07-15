import React from "react";
import { ArenaContext } from "../Base/Layout";
import Combat from "./Combat";

export default () => {
  return (
    <ArenaContext.Consumer>
      {context => (
        <div className="rounded-content-box">
          <Combat context={context} />
        </div>
      )}
    </ArenaContext.Consumer>
  );
};
