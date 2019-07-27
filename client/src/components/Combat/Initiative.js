import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ players, setPhase, setPlayers }) => {
  const playerOne = players[0];
  const playerTwo = players[1];
  const [done, setDone] = useState(false);

  const rollInitiative = () => {
    const roll = () => {
      return Math.floor(Math.random() * 20 + 1);
    };
    const playerOneRoll = roll();
    const playerTwoRoll = roll();
    if (playerOneRoll > playerTwoRoll) {
      return true;
    } else if (playerTwoRoll > playerOneRoll) {
      return false;
    } else {
      rollInitiative();
    }
  };

  const resetInitiative = () => {
    if (playerOne.currentSpeed > playerTwo.currentSpeed) {
      const order = [playerTwo, playerOne];
      setPlayers(order);
    } else if (playerTwo.currentSpeed > playerOne.currentSpeed) {
      const order = [playerOne, playerTwo];
      setPlayers(order);
    } else {
      if (rollInitiative()) {
        const order = [playerTwo, playerOne];
        setPlayers(order);
      } else {
        const order = [playerOne, playerTwo];
        setPlayers(order);
      }
    }
    setDone(!done);
  };

  return (
    <div>
      <h5>
        Set initiative order for {playerOne.name} and {playerTwo.name}
      </h5>
      <p>Default order is:</p>
      <ol>
        <li>{players[0].name}</li>
        <li>{players[1].name}</li>
      </ol>
      {done && (
        <div>
          <h5>Initiative order after:</h5>
          <ol>
            <li>
              {players[0].name} will place {players[0].male ? "his" : "her"}{" "}
              actions FIRST
            </li>
            <li>
              {players[1].name} will place {players[1].male ? "his" : "her"}{" "}
              actions LAST
            </li>
          </ol>
          <Button className="btn" onClick={e => setPhase(4)}>
            Go to next phase
          </Button>
        </div>
      )}
      {!done && (
        <Button className="btn" onClick={e => resetInitiative()}>
          See what the initiative order will be...
        </Button>
      )}
    </div>
  );
};
