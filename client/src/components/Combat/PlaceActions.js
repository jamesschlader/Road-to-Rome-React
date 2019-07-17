import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const allDone = () => {
    setDone(!done);
    decideReady();
  };

  console.log(`inside Place actions, player is `, player);
  return (
    <div>
      <h5>Place actions for {player.name}</h5>

      {!done && (
        <Button className="btn" onClick={e => allDone()}>
          All done placing {player.name}'s actions
        </Button>
      )}

      {done && <h5>Done placing {player.name}'s actions</h5>}
    </div>
  );
};
