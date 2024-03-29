import React, { useState, useEffect } from "react";
import Recovery from "./Recovery";
import Tactics from "./Tactics";
import Initiative from "./Initiative";
import BattleBoard from "./BattleBoard";
import ResolveActions from "./ResolveActions";
import Fatigue from "./Fatigue";
import phases from "../../utilities/battlePhases";
import newBlankAction from "../../utilities/newBlankAction";

export default ({ playerOne, playerTwo, setStep, Battle, setWinner }) => {
  const [players, setPlayers] = useState([playerOne, playerTwo]);
  const firstBlank = newBlankAction();
  const [phase, setPhase] = useState(phases.recovery);
  const [ready, setReady] = useState(false);
  const [matchedActions, setMatchedActions] = useState([]);
  const [positions, setPositions] = useState([firstBlank]);
  const [placements, setPlacements] = useState([]);
  const [target, setTarget] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [loser, setLoser] = useState(null);

  const decideReady = newPhase => {
    if (ready) {
      setReady(!ready);
      setPhase(newPhase);
    } else {
      setReady(!ready);
    }
  };

  useEffect(() => {
    if (loser) {
      const winner = players.filter(player => {
        return player.id !== loser.id;
      });
      setWinner(winner[0]);
    }
  }, [loser]);

  useEffect(() => {
    if (phase === phases.exit) {
      setStep(4);
    }
  }, [phase]);

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
              setGameOver={setGameOver}
              gameOver={gameOver}
              loser={loser}
              setLoser={setLoser}
              Battle={Battle}
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
            setMatchedActions={setMatchedActions}
            placements={placements}
            setPlacements={setPlacements}
            positions={positions}
            setPositions={setPositions}
            target={target}
            setTarget={setTarget}
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
            <Fatigue
              player={player}
              decideReady={decideReady}
              setMatchedActions={setMatchedActions}
              setPositions={setPositions}
              setPlacements={setPlacements}
            />
          ))}
        </ul>
      )}
    </>
  );
};
