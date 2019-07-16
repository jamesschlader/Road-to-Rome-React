import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const allDone = () => {
    setDone(!done);
    decideReady();
  };
  return (
    <div>
      <h5>Do the recovery actions for {player.name}</h5>

      {!done && (
        <Button className="btn" onClick={e => allDone()}>
          Advance to Tactics Phase
        </Button>
      )}
      {done && <h5>{player.name} is all done.</h5>}
    </div>
  );
};
