import React, { useState } from "react";
import { Button, Row } from "react-materialize";
import SelectArmor from "./SelectArmor";
import SelectWeapon from "./SelectWeapon";

export default ({ setStep, players }) => {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState(1);

  const decideReady = () => {
    if (ready) {
      const newPhase = phase + 1;
      setReady(!ready);
      setPhase(newPhase);
    } else {
      setReady(!ready);
    }
  };

  return (
    <div>
      <h5>Set Arms and Armor</h5>
      <Row>
        {players[0] && phase === 1 ? (
          <ul>
            {players.map(player => (
              <SelectArmor
                key={player.id}
                player={player}
                decideReady={decideReady}
              />
            ))}
          </ul>
        ) : (
          <>
            {" "}
            <h5>Players done selecting armor</h5>
          </>
        )}
      </Row>

      <Row>
        {phase === 2 && (
          <ul>
            {players.map(player => (
              <SelectWeapon
                key={player.id}
                player={player}
                decideReady={decideReady}
              />
            ))}
          </ul>
        )}
        {phase > 2 && (
          <Button className="btn" onClick={e => setStep(2)}>
            Push this button to advance
          </Button>
        )}
      </Row>
    </div>
  );
};
