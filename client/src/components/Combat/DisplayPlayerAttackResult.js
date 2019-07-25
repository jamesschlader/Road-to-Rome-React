import React, { useEffect } from "react";
import { Button } from "react-materialize";

export default ({
  actionOne,
  actionTwo,
  playerOne,
  playerTwo,
  index,
  result,
  handleRoll,
  showToHitTarget,
  setWoundedPlayer
}) => {
  useEffect(() => {
    if (result > 0) {
      const hit =
        actionTwo.getAttackResult(actionOne.getToHitResult(result)) &&
        playerOne.getDamage(actionOne.speed) >=
          playerTwo.withAttackType(actionOne);
      const wound =
        playerOne.getDamage(actionOne.speed) >
        playerTwo.withAttackType(actionOne);
      const woundValue =
        playerOne.getDamage(actionOne.speed) -
        playerTwo.withAttackType(actionOne);

      if (hit && wound) {
        playerTwo.addWound(woundValue);
        const wounded = {
          player: playerTwo,
          action: actionTwo,
          index: index
        };
        setWoundedPlayer(wounded);
      }
    }
  }, [result]);
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
          <p>To-hit Roll: {actionOne.getToHitResult(result)}</p>
          <p>{playerTwo.name}'s...</p>
          {showToHitTarget(actionTwo)}
          <h5>
            {actionTwo.getAttackResult(actionOne.getToHitResult(result))
              ? "Hit!"
              : "Miss!"}
          </h5>
          <p>
            {actionTwo.getAttackResult(actionOne.getToHitResult(result)) &&
            playerOne.getDamage(actionOne.speed) >=
              playerTwo.withAttackType(actionOne)
              ? `${playerTwo.name} WOUNDED for ${playerOne.getDamage(
                  actionOne.speed
                ) - playerTwo.withAttackType(actionOne)} damage!`
              : `No wound suffered by ${playerTwo.name}`}
          </p>
        </>
      )}
    </>
  );
};
