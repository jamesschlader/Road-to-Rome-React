import React from "react";
import { Button } from "react-materialize";

export default ({
  actionOne,
  actionTwo,
  playerOne,
  playerTwo,
  result,
  handleRoll,
  getToHitResult,
  showToHitTarget,
  getAttackResult,
  getToHitTarget,
  withAttackType
}) => {
  
  return (
    <>
      {actionOne.title.includes("Attack") && result <= 0 && (
        <Button className="btn" onClick={e => handleRoll(playerOne)}>
          Roll {playerOne.name} To-hit
        </Button>
      )}

      {actionOne.title.includes("Attack") && result > 0 && (
        <>
          <p>{playerOne.name}' Attack Roll Results:</p>
          <p>Roll Result: {result}</p>
          {actionOne.title.includes("Weak") && <p>Weak Point Penalty: -5</p>}
          <p>To-hit Roll: {getToHitResult(actionOne, result)}</p>
          <p>{playerTwo.name}'s...</p>
          {showToHitTarget(actionTwo)}
          <h5>
            {getAttackResult(
              getToHitResult(actionOne, result),
              getToHitTarget(actionTwo)
            )
              ? "Hit!"
              : "Miss!"}
          </h5>
          <p>
            {getAttackResult(
              getToHitResult(actionOne, result),
              getToHitTarget(actionTwo)
            ) &&
            playerOne.getDamage(actionOne.speed) >=
              withAttackType(playerTwo, actionOne)
              ? `${playerTwo.name} WOUNDED for ${playerOne.getDamage(
                  actionOne.speed
                ) - playerTwo.getWoundThreshold()} damage!`
              : `No wound suffered by ${playerTwo.name}`}
          </p>
        </>
      )}
    </>
  );
};
