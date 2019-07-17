import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, setPhase }) => {
  const [run, setRun] = useState(false);

  const runFatigue = player => {
    const total = player.countFatigueFromActions();
    player.fatigue = player.setFatigue(total);
    setRun(!run);
    player.actions = player.clearActions();
    return (
      <p>
        Just added {total} to player fatigue. Now is {player.fatigue}
      </p>
    );
  };

  console.log(`inside fatigue, player is `, player);
  return (
    <li key={player.id}>
      <h5>Set fatigue values for {player.name}</h5>

      <p>
        Before running fatigue, {player.name}'s fatigue is {player.fatigue}
      </p>

      {!run && (
        <Button className="btn" onClick={e => runFatigue(player)}>
          Press this to run {player.name}'s set fatigue{" "}
        </Button>
      )}
      {run && (
        <p>
          {player.name}'s fatigue now {player.fatigue}
        </p>
      )}

      <Button className="btn" onClick={e => setPhase(1)}>
        Start the loop over
      </Button>
    </li>
  );
};
