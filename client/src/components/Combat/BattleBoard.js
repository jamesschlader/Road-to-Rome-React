import React, { useState, useEffect } from "react";
import CombatCard from "./CombatCard";
import ActionTinyCard from "./ActionTinyCard";
import { Button, Row } from "react-materialize";
import newBlankAction from "../../utilities/newBlankAction";
import Fatigue from "./Fatigue";
import DisplayMatchedActions from "./DisplayMatchedActions";

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
  const playerOne = players[0];
  const playerTwo = players[1];

  const allDone = () => {
    if (allFinished === 3) {
      setMatchedActions(finalPairs(placements));
      setPhase(5);
    } else {
      setDone(!done);
      setAllFinished(allFinished + 1);
    }
  };

  const resetBoard = arr => {
    setPlacements(arr);
    setTarget(null);
    buildPositions();
  };

  const addToPlacements = (target, item) => {
    let newPlacements = [];
    if (placements.length === 0) {
      newPlacements = [target];
      resetBoard(newPlacements);
    } else {
      const justPositionsIds = positions.map(item => item.id);
      const blankIndex = justPositionsIds.indexOf(item.id);
      const nextActionId = justPositionsIds[blankIndex + 1];
      if (blankIndex === 0) {
        newPlacements = [target, ...placements];
        resetBoard(newPlacements);
      } else if (blankIndex === positions.length - 1) {
        newPlacements = [...placements, target];
        resetBoard(newPlacements);
      } else {
        const justPlacementsIds = placements.map(item => item.id);
        const nextActionIndex = justPlacementsIds.indexOf(nextActionId);
        const front = placements.slice(0, nextActionIndex);
        const back = placements.slice(nextActionIndex);

        newPlacements = [...front, target, ...back];
        resetBoard(newPlacements);
      }
    }
  };

  const removeFromPlacements = (item, turn) => {
    console.log(item);
    console.log(`turn is ${turn}`);
    if (turn === allFinished) {
    }
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

  const getPlayer = action => {
    if (action.title === "Blank") {
      return 1;
    } else {
      return action.owner.id === playerOne.id ? 1 : 2;
    }
  };
  const processPairs = (one, two) => {
    let pairs = [];

    if (one.owner.id === two.owner.id) {
      if (one.title.includes("tta")) {
        const zeroDefense = {
          id: Date.now() * Math.random(),
          title: "Defense",
          value: 0,
          name: Fatigue,
          owner: one.owner.id === playerOne.id ? playerOne : playerTwo
        };
        const newPair = [one, zeroDefense];

        pairs.push(newPair);
      } else {
        const newBlank = newBlankAction();
        newBlank.owner = one.owner.id === playerOne.id ? playerOne : playerTwo;
        const newPair = [one, newBlank];

        pairs.push(newPair);
      }
    } else {
      const newPair = [one, two];

      pairs.push(newPair);
    }

    return pairs;
  };

  const finalPairs = placements => {
    let pairs = [];
    for (let i = 0; i < placements.length; i++) {
      if (i + 1 < placements.length) {
        const newPair = processPairs(placements[i], placements[i + 1]);
        pairs.push(...newPair);
        i++;
      } else {
        const newBlank = newBlankAction();
        newBlank.owner =
          placements[i].owner.id === playerOne.id ? playerTwo : playerOne;
        const newPair = [placements[i], newBlank];

        pairs.push(newPair);
      }
    }
    return pairs;
  };

  useEffect(() => {
    buildPositions();
  }, [placements]);

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
      {allFinished < 3 && (
        <Row>
          <ul>
            {positions.map(action => (
              <li key={action.id} className="inline-content tight">
                <CombatCard
                  item={action}
                  className="tight"
                  target={target}
                  remove={removeFromPlacements}
                  add={addToPlacements}
                  turn={allFinished}
                  player={getPlayer(action)}
                />
              </li>
            ))}
          </ul>
        </Row>
      )}

      {allFinished === 3 && (
        <>
          {" "}
          <Row>
            <ul>
              {finalPairs(placements).map((pairs, index) => (
                <ul key={index + Math.random()} className="grouped-content">
                  {pairs.map(action => (
                    <DisplayMatchedActions action={action} />
                  ))}
                </ul>
              ))}
            </ul>
          </Row>
          <Button className="btn" onClick={e => allDone()}>
            Move on
          </Button>
        </>
      )}
    </div>
  );
};
