import React, { useState, useEffect } from "react";
import CombatCard from "./CombatCard";
import ActionTinyCard from "./ActionTinyCard";
import { Button, Row } from "react-materialize";
import newBlankAction from "../../utilities/newBlankAction";

export default ({
  players,
  setPhase,
  setMatchedActions,
  placements,
  setPlacements,
  target,
  setTarget,
  positions,
  setPositions
}) => {
  const [allFinished, setAllFinished] = useState(1);
  const [done, setDone] = useState(false);

  const allDone = () => {
    if (allFinished === 3) {
      setMatchedActions(placements);
      setPhase(5);
    }

    setDone(!done);

    setAllFinished(allFinished + 1);
  };

  const addToPlacements = item => {
    const newPlacements = [...placements, item];
    setPlacements(newPlacements);
    setTarget(null);
    buildPositions();
  };

  const removeFromPlacements = item => {
    const newPlacements = placements.filter(pos => {
      return pos.id !== item.id;
    });
    setPlacements(newPlacements);
    setTarget(null);
    buildPositions();
  };

  const handleTarget = item => {
    setTarget(item);
  };

  const buildPositions = () => {
    if (placements === 0) {
      const newPositions = [newBlankAction()];
      setPositions(newPositions);
      return newPositions;
    } else {
      let newPositions = [];
      for (let i = 0; i < placements.length; i++) {
        newPositions.push(placements[i]);
        newPositions.push(newBlankAction());
      }
      newPositions.unshift(newBlankAction());
      setPositions(newPositions);
      return newPositions;
    }
  };

  const unfinishedBusiness = player => {
    const placedIds = placements.map(item => item.id);
    return player.actions.filter(action => {
      return !placedIds.includes(action.id) && action;
    });
  };

  useEffect(() => {
    buildPositions();
  }, [placements]);

  console.log(`target is `, target);
  return (
    <div>
      {allFinished < 3 && (
        <Row>
          {!done && (
            <>
              <h5>{players[0].name}'s Actions:</h5>
              <ul className="inline-content">
                {unfinishedBusiness(players[0]).map(action => (
                  <li className="inline-content">
                    <ActionTinyCard
                      action={action}
                      target={target}
                      doSomething={handleTarget}
                    />
                  </li>
                ))}
              </ul>
              {unfinishedBusiness(players[0]).length < 1 && (
                <Button className="btn" onClick={e => allDone()}>
                  All done placing actions for {players[0].name}
                </Button>
              )}
            </>
          )}
          {done && (
            <>
              <p>{players[1].name}</p>
              <ul className="inline-content">
                {unfinishedBusiness(players[1]).map(action => (
                  <>
                    <ActionTinyCard
                      action={action}
                      target={target}
                      doSomething={handleTarget}
                    />
                  </>
                ))}
              </ul>
              {unfinishedBusiness(players[1]).length < 1 && (
                <Button className="btn" onClick={e => allDone()}>
                  All done placing actions for {players[1].name}
                </Button>
              )}
            </>
          )}
        </Row>
      )}

      <Row>
        <ul>
          {console.log(`inside render, positions:`, positions)}
          {positions.map(action => (
            <li key={action.id} className="inline-content tight">
              <CombatCard
                item={action}
                className="tight"
                target={target}
                remove={removeFromPlacements}
                add={addToPlacements}
              />
            </li>
          ))}
        </ul>
      </Row>

      {allFinished === 3 && (
        <Button className="btn" onClick={e => allDone()}>
          Move on
        </Button>
      )}
    </div>
  );
};
