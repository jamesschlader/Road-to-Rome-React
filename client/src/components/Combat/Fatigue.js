import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({
  player,
  decideReady,
  setMatchedActions,
  setPositions,
  setPlacements
}) => {
  const [run, setRun] = useState(false);

  const allDone = () => {
    setRun(!run);

    decideReady(1);
  };

  const runFatigue = player => {
    player.clearFatigue();
    const total = player.countFatigueFromActions();
    player.setFatigue(total);
    player.actions = player.clearActions();
    setMatchedActions([]);
    setPositions([]);
    setPlacements([]);

    allDone();
  };

  return (
    <li key={player.id}>
      <h5>Set fatigue values for {player.name}</h5>

      <p>
        Fatigue in the previous round for {player.name}'s was {player.fatigue}
      </p>

      {!run && (
        <Button className="btn" onClick={e => runFatigue(player)}>
          Press this to run {player.name}'s set fatigue{" "}
        </Button>
      )}
      {run && (
        <p>
          {player.name}'s fatigue generated this round is {player.fatigue}
        </p>
      )}
    </li>
  );
};
