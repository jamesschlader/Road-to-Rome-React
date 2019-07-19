import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, decideReady, setMatchedActions }) => {
  const [done, setDone] = useState(false);
  const allDone = () => {
    setDone(!done);
    decideReady();
  };

  const [runrecovery, setrunrecovery] = useState(false);

  const runRecovery = player => {
    player.setCurrentStamina(player.getRecovery());

    player.setCurrentSpeed();
    player.clearActions();
    setMatchedActions([]);
    setrunrecovery(!runrecovery);
    return <p>All done running recovery</p>;
  };

  return (
    <div>
      <h5>Do the recovery actions for {player.name}</h5>
      <dl>
        <dt>recovery</dt>
        <dd>{player.getRecovery()}</dd>
        <dt>current stamina</dt>
        <dd>{player.currentStamina}</dd>
        <dt>current speed</dt>
        <dd>{player.currentSpeed}</dd>
        <dt>fatigue</dt>
        <dd>{player.fatigue}</dd>
        <dt>wounds</dt>
        <dd>{player.wounds}</dd>
        <dt>wound threshold</dt>
        <dd>{player.getWoundThreshold()}</dd>
        <dt>total harm</dt>
        <dd>{player.getHarm()}</dd>
        <dt>weapon</dt>
        <dd>{player.weapon.name}</dd>
        <dt>armor</dt>
        {player.armor.map((armor, index) => (
          <dd key={armor.id * index}>{armor.name}</dd>
        ))}
      </dl>

      <h5>Running recovery function...standby...</h5>

      {!runrecovery ? (
        runRecovery(player)
      ) : (
        <p>
          done running recovery. {player.name} stamina is now{" "}
          <span>{player.currentStamina}</span>
        </p>
      )}

      {!done && (
        <Button className="btn" onClick={e => allDone()}>
          Advance to Tactics Phase
        </Button>
      )}
      {done && <h5>{player.name} is all done.</h5>}
    </div>
  );
};
