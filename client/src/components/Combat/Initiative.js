import React from "react";
import { Button } from "react-materialize";

export default ({ players, setPhase, setPlayers }) => {
  const playerOne = players[0];
  const playerTwo = players[1];

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
    if (playerOne.speed > playerTwo.speed) {
      const order = [playerOne, playerTwo];
      setPlayers(order);
    } else if (playerTwo.speed > playerOne.speed) {
      const order = [playerTwo, playerOne];
      setPlayers(order);
    } else {
      if (rollInitiative()) {
        const order = [playerOne, playerTwo];
        setPlayers(order);
      } else {
        const order = [playerTwo, playerOne];
        setPlayers(order);
      }
    }
    setPhase(4);
  };
  return (
    <div>
      <h5>
        Set initiative order for {playerOne.name} and {playerTwo.name}
      </h5>
      <Button className="btn" onClick={e => resetInitiative()}>
        Go to Place Actions
      </Button>
    </div>
  );
};
