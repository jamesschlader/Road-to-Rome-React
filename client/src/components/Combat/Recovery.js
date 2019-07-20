import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, decideReady, setMatchedActions }) => {
  const [done, setDone] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const allDone = () => {
    setDone(!done);
    decideReady(2);
  };

  const [runrecovery, setrunrecovery] = useState(false);

  const runRecovery = player => {
    const before = player.currentStamina;
    const after = player.setCurrentStamina(player.getRecovery());
    if (before > after) {
      setDown(!down);
    } else if (after > before) {
      setUp(!up);
    }
    player.setCurrentSpeed();
    player.clearActions();

    setMatchedActions([]);
    setrunrecovery(!runrecovery);
    return <p>All done running recovery</p>;
  };

  return (
    <div>
      <h5>Do the recovery actions for {player.name}</h5>

      <table>
        <thead>
          <tr>
            <th>Current Stamina</th>
            <th>Recovery</th>
            <th>Current Speed</th>
            <th>Total Harm</th>
            <th>Fatigue</th>
            <th>Wounds</th>
            <th>Wound Threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                fontSize: "28px",
                color: (up && "green") || (down && "#b71c1c")
              }}
            >
              {player.currentStamina}
            </td>
            <td>{player.getRecovery()}</td>
            <td>{player.speed}</td>
            <td>{player.getHarm()}</td>
            <td>{player.fatigue}</td>
            <td>{player.wounds}</td>
            <td>{player.getWoundThreshold()}</td>
          </tr>
        </tbody>
      </table>

      <h5>Running recovery function...standby...</h5>

      {!runrecovery && runRecovery(player)}

      {!done && (
        <Button className="btn" onClick={e => allDone()}>
          Advance to Tactics Phase
        </Button>
      )}
      {done && <h5>{player.name} is all done.</h5>}
    </div>
  );
};
