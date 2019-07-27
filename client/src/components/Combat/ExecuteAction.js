import React, { useState, useEffect } from "react";
import { Button } from "react-materialize";
import FlipCard from "./FlipCard";
import DisplayPlayerAttackResult from "./DisplayPlayerAttackResult";

export default ({ actions, finishAction, index, setWoundedPlayer }) => {
  const playerOne = actions[0].owner;
  const playerTwo = actions[1].owner;
  const [resultOne, setResultOne] = useState(0);
  const [resultTwo, setResultTwo] = useState(0);
  const [containsAttack, setContainsAttack] = useState(0);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    const attack = actions.filter(item => {
      return item.title.includes("Attack");
    });
    if (attack.length > 0) {
      setContainsAttack(attack.length);
    } else {
      setContainsAttack(0);
    }
  }, [actions]);

  const handleActionFinish = () => {
    setPosted(true);
    finishAction(index);
  };

  const handleRoll = player => {
    const rollResult = Math.floor(Math.random() * 20) + 1;
    player.id === playerOne.id
      ? setResultOne(rollResult)
      : setResultTwo(rollResult);
    setContainsAttack(containsAttack - 1);
  };

  const showToHitTarget = action => {
    if (action.title.includes("Blank")) {
      return (
        <>
          <p>Defense: 0</p>
          <p>To-hit #: 10</p>
        </>
      );
    } else if (action.title.includes("Full")) {
      return (
        <>
          <p>Defense: {action.owner.skill}</p>
          <p>To-hit #: {10 + action.owner.skill}</p>
        </>
      );
    } else {
      return (
        <>
          <p>Defense: {action.speed}</p>
          <p>To-hit #: {10 + action.speed}</p>
        </>
      );
    }
  };

  return (
    <div>
      {!posted && (
        <ul className="inline-content">
          {actions.map(action => (
            <li key={action.id} className="inline-content tight">
              <FlipCard
                action={action}
                result={
                  action.owner.id === playerOne.id ? resultOne : resultTwo
                }
              />
            </li>
          ))}
        </ul>
      )}

      <div className="inline-content tight">
        <h5>Results</h5>

        <DisplayPlayerAttackResult
          actionOne={actions[0]}
          actionTwo={actions[1]}
          playerOne={playerOne}
          playerTwo={playerTwo}
          index={index}
          result={resultOne}
          handleRoll={handleRoll}
          showToHitTarget={showToHitTarget}
          setWoundedPlayer={setWoundedPlayer}
        />

        <DisplayPlayerAttackResult
          actionOne={actions[1]}
          actionTwo={actions[0]}
          playerOne={playerTwo}
          playerTwo={playerOne}
          index={index}
          result={resultTwo}
          handleRoll={handleRoll}
          showToHitTarget={showToHitTarget}
          setWoundedPlayer={setWoundedPlayer}
        />
      </div>

      {containsAttack < 1 && !posted && (
        <Button className="btn" onClick={e => handleActionFinish()}>
          Post the results of this action
        </Button>
      )}
    </div>
  );
};
