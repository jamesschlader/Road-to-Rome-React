import React, { useState } from "react";
import { Card } from "react-materialize";

export default ({ action, result }) => {
  const [flipped, setFlipped] = useState(false);

  const cardStyles = flipped => {
    return `flip-card ${flipped ? "flipped" : ""}`;
  };

  const handleFlip = () => {
    setFlipped(!flipped);
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

  const fatigueCost = action => {
    if (action.speed - action.owner.currentSpeed > 0) {
      if (action.title.includes("Def")) {
        const diff = 5 - action.speed;
        return Math.floor((diff + action.speed) * action.value);
      } else {
        const diff = 5 - action.speed;
        return diff + action.speed;
      }
    } else {
      if (action.title.includes("Def")) {
        return Math.floor(action.speed * action.value);
      } else {
        return action.speed;
      }
    }
  };

  return (
    <>
      <div className="flip-card-scene">
        <div className={cardStyles(flipped)} onClick={e => handleFlip()}>
          <div className="flip-card-face flip-card-front">
            <Card
              className="card-layout"
              title={action.title === "Blank" ? "Blank" : action.owner.name}
            >
              <img
                src={
                  action.title === "Blank" ? action.image : action.owner.image
                }
                alt={action.title}
                className="card-img"
              />
            </Card>
          </div>
          <div className="flip-card-face flip-card-back">
            <Card
              className="card-layout"
              title={action.title === "Blank" ? "Blank" : action.title}
            >
              <img src={action.image} alt={action.title} className="card-img" />
              <div>
                <p>Speed Devoted: {action.speed}</p>
                <p>Fatigue Cost: {fatigueCost(action)}</p>

                {!action.title.includes("Attack") && showToHitTarget(action)}
                {!action.title.includes("Attack") && (
                  <p>Wound Threshold: {action.owner.getWoundThreshold()}</p>
                )}

                {action.title.includes("Attack") && (
                  <>
                    {" "}
                    <p>Skill: {action.owner.skill}</p>
                    <p>Damage on Hit: {action.owner.getDamage(action.speed)}</p>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
