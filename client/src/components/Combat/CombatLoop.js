import React, { useState } from "react";
import Recovery from "./Recovery";
import Tactics from "./Tactics";
import Initiative from "./Initiative";
import BattleBoard from "./BattleBoard";
import ResolveActions from "./ResolveActions";
import Fatigue from "./Fatigue";
import phases from "../../utilities/battlePhases";

export default ({ playerOne, playerTwo, setStep }) => {
  const [players, setPlayers] = useState([playerOne, playerTwo]);

  const [phase, setPhase] = useState(phases.recovery);
  const [ready, setReady] = useState(false);
  const [matchedActions, setMatchedActions] = useState([]);

  const decideReady = newPhase => {
    console.log(`ready inside decideReady = ${ready}`);
    if (ready) {
      setReady(!ready);
      setPhase(newPhase);
    } else {
      setReady(!ready);
    }
  };

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
              setMatchedActions={setMatchedActions}
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
          <BattleBoard
            players={players}
            setPhase={setPhase}
            matchedActions={matchedActions}
            setMatchedActions={setMatchedActions}
          />
        </ul>
      )}

      {phase === phases.resolve && (
        <ul>
          <ResolveActions
            actions={matchedActions}
            setMatchedActions={setMatchedActions}
            setPhase={setPhase}
          />
        </ul>
      )}
      {phase === phases.fatigue && (
        <ul>
          {players.map(player => (
            <Fatigue player={player} decideReady={decideReady} />
          ))}
        </ul>
      )}
    </>
  );
};
