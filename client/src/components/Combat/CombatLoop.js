import React, { useState } from "react";
import Recovery from "./Recovery";
import Tactics from "./Tactics";
import Initiative from "./Initiative";
import PlaceActions from "./PlaceActions";
import ResolveActions from "./ResolveActions";
import Fatigue from "./Fatigue";
import phases from "../../utilities/battlePhases";

export default ({ playerOne, playerTwo, setStep }) => {
  const [players, setPlayers] = useState([playerOne, playerTwo]);

  const [phase, setPhase] = useState(phases.recovery);
  const [ready, setReady] = useState(false);
  const [actions, setActions] = useState([]);

  const decideReady = () => {
    if (ready) {
      const newPhase = phase + 1;
      setReady(!ready);
      setPhase(newPhase);
    } else {
      setReady(!ready);
    }
  };

  const addAction = newAction => {
    const newActions = [...actions, newAction];
    setActions(newActions);
  };

  const removeAction = exit => {
    const newActions = actions.filter(action => {
      return action.id !== exit.id;
    });
    setActions(newActions);
  };

  console.log(`inside CombatLoop, playerOne = `, playerOne);
  console.log(`inside CombatLoop, playerTwo = `, playerTwo);

  return (
    <>
      {phase === phases.recovery && (
        <ul>
          {" "}
          {players.map(player => (
            <Recovery
              key={player.id}
              player={player}
              decideReady={decideReady}
            />
          ))}
        </ul>
      )}

      {phase === phases.tactics && (
        <ul>
          {players.map(player => (
            <Tactics
              key={player.id}
              player={player}
              decideReady={decideReady}
              actions={actions}
              addAction={addAction}
              removeAction={removeAction}
            />
          ))}
        </ul>
      )}

      {phase === phases.initiative && (
        <Initiative
          players={players}
          setPhase={setPhase}
          setPlayers={setPlayers}
        />
      )}

      {phase === phases.place && (
        <ul>
          {players.map(player => (
            <PlaceActions player={player} decideReady={decideReady} />
          ))}
        </ul>
      )}

      {phase === phases.resolve && (
        <ul>
          {actions.map(action => (
            <ResolveActions
              players={players}
              decideReady={decideReady}
              action={action}
              removeAction={removeAction}
            />
          ))}
        </ul>
      )}
      {phase === phases.fatigue && (
        <ul>
          {players.map(player => (
            <Fatigue player={player} setPhase={setPhase} />
          ))}
        </ul>
      )}
    </>
  );
};
