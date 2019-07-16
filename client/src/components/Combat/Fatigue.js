import React from "react";
import { Button } from "react-materialize";

export default ({ players, setPhase }) => {
  const playerOne = players[0];
  const playerTwo = players[1];

  return (
    <div>
      <h5>
        Set fatigue values for {playerOne.name} and {playerTwo.name}
      </h5>

      <Button className="btn" onClick={e => setPhase(1)}>
        Start the loop over
      </Button>
    </div>
  );
};
