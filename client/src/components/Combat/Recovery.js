import React, { useState } from "react";
import { Button } from "react-materialize";
import { Mutation } from "react-apollo";
import { updateWarriorMutation } from "../../api/Warrior/mutations/updateWarrior";

export default ({
  player,
  decideReady,
  setMatchedActions,
  gameOver,
  setGameOver,
  loser,
  setLoser,

  Battle
}) => {
  const { purse } = Battle;

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
    checkGameOver();
    return <p>All done running recovery</p>;
  };

  const checkGameOver = () => {
    if (player.currentStamina <= 0) {
      setLoser(player);

      setGameOver(true);
    }
  };

  const manageExit = () => {
    console.log(player);
    setDone(!done);
    decideReady(7);
  };

  const addWinnerMutation = () => {
    const obj = {
      id: player.id,
      wallet: player.wallet + purse,
      winnings: player.winnings + purse
    };
    return (
      <Mutation mutation={updateWarriorMutation} variables={{ ...obj }}>
        {postMutation => (
          <Button
            className="btn"
            onClick={e => {
              postMutation();
              manageExit();
            }}
          >
            Exit
          </Button>
        )}
      </Mutation>
    );
  };

  const addLoserMutation = () => {
    const obj = {
      id: player.id,
      alive: false
    };
    return (
      <Mutation mutation={updateWarriorMutation} variables={{ ...obj }}>
        {postMutation => (
          <Button
            className="btn"
            onClick={e => {
              postMutation();
              manageExit();
            }}
          >
            Exit
          </Button>
        )}
      </Mutation>
    );
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
            <td>{player.currentSpeed}</td>
            <td>{player.getHarm()}</td>
            <td>{player.fatigue}</td>
            <td>{player.wounds}</td>
            <td>{player.getWoundThreshold()}</td>
          </tr>
        </tbody>
      </table>

      <h5>Running recovery function...standby...</h5>

      {!runrecovery && runRecovery(player)}

      {gameOver && (
        <>
          {loser.id === player.id ? (
            <p>Whoa! You're stamina is below 0 after recovery. You lose!</p>
          ) : (
            <p>Congratulations! You won the battle!</p>
          )}
          {!done &&
            (loser.id === player.id ? addLoserMutation() : addWinnerMutation())}
        </>
      )}

      {!done && !gameOver && (
        <Button className="btn" onClick={e => allDone()}>
          Advance to Tactics Phase
        </Button>
      )}
      {done && <h5>{player.name} is all done.</h5>}
    </div>
  );
};
