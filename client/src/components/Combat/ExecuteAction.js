import React, { useState } from "react";
import { Button } from "react-materialize";
import FlipCard from "./FlipCard";
import DisplayPlayerAttackResult from "./DisplayPlayerAttackResult";

export default ({ actions, finishAction, index }) => {
  const playerOne = actions[0].owner;
  const playerTwo = actions[1].owner;

  const [resultOne, setResultOne] = useState(0);
  const [resultTwo, setResultTwo] = useState(0);

  const handleActionFinish = () => {
    finishAction(index);
  };

  const handleRoll = player => {
    player.id === playerOne.id
      ? setResultOne(Math.floor(Math.random() * 20 + 1))
      : setResultTwo(Math.floor(Math.random() * 20 + 1));
  };

  const getToHitResult = (action, result) => {
    return action.title.includes("Weak")
      ? result + action.owner.skill - 5
      : result + action.owner.skill;
  };

  const getToHitTarget = action => {
    if (action.title.includes("Full")) {
      return 10 + action.owner.skill;
    } else if (action.title.includes("end")) {
      return 10 + action.speed;
    } else {
      return 10;
    }
  };

  const getAttackResult = (attackRoll, targetToHit) => {
    return attackRoll >= targetToHit ? true : false;
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

  const withAttackType = (player, action) => {
   
    return action.title.includes("Weak")
      ? player.getWoundThreshold()
      : player.getWoundThreshold() + (parseInt(player.armor[0].strength) - 10);
  };

  return (
    <div>
      <ul className="inline-content">
        {actions.map(action => (
          <li key={action.id} className="inline-content tight">
            <FlipCard
              action={action}
              result={action.owner.id === playerOne.id ? resultOne : resultTwo}
            />
          </li>
        ))}
      </ul>

      <div className="inline-content tight">
        <h5>Show Results Here</h5>

       <DisplayPlayerAttackResult 
       actionOne={actions[0]} 
       actionTwo={actions[1]} 
       playerOne={playerOne} 
       playerTwo={playerTwo} 
       result={resultOne} 
       handleRoll={handleRoll} 
       getToHitResult={getToHitResult} 
       showToHitTarget={showToHitTarget} 
       getAttackResult={getAttackResult} 
       getToHitTarget={getToHitTarget} 
       withAttackType={withAttackType}/>

      <DisplayPlayerAttackResult 
      actionOne={actions[1]}
      actionTwo={actions[0]}
      playerOne={playerTwo}
      playerTwo={playerOne}
      result={resultTwo}
      handleRoll={handleRoll} 
      getToHitResult={getToHitResult} 
      showToHitTarget={showToHitTarget} 
      getAttackResult={getAttackResult} 
      getToHitTarget={getToHitTarget} 
      withAttackType={withAttackType}
      />

    
      </div>

      <Button className="btn" onClick={e => handleActionFinish()}>
        Post the results of this action
      </Button>
    </div>
  );
};
