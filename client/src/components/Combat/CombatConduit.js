import React, { useEffect } from "react";
import { ArenaContext } from "../Base/Layout";
import Combat from "./Combat";

export default () => {
  useEffect(() => {
    const whereIWas = localStorage.getItem("whereWasI");
    console.log(whereIWas);
  }, []);
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
