import React, { useState, useEffect } from "react";
import { Button } from "react-materialize";

export default ({ players, decideReady, action, removeAction }) => {
  const [done, setDone] = useState(false);
  const allDone = () => {
    setDone(!done);
    decideReady();
    removeAction(action.id);
  };

  return (
    <>
      <div>
        <h5>
          Process {action.tile} for {action.playerId}
        </h5>
      </div>
      {!done && (
        <Button className="btn" onClick={e => allDone()}>
          Execute {action.title} for {action.playerId}
        </Button>
      )}
      {done && (
        <h5>
          Finished with {action.title} for {action.playerId}
        </h5>
      )}
    </>
  );
};
