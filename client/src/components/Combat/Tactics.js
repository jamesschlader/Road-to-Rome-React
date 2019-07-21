import React, { useState } from "react";
import { Button } from "react-materialize";
import ActionCard from "./ActionCard";
import cardContent from "../../utilities/cardContent";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const [speed, setSpeed] = useState(player.currentSpeed);
  const obj = {
    title: "No Action",
    name: "fatigue",
    value: 0,
    image: "/img/game-armor-images/magic-socks.svg"
  };

  const allDone = () => {
    setDone(!done);
    decideReady(3);
  };

  const playerOptions = value => {
    if (value === player.speed) {
      return cardContent;
    } else if (speed > 0) {
      return cardContent.filter(item => {
        return item.title !== "Full Defense";
      });
    } else {
      return [obj];
    }
  };

  const adjustSpeed = value => {
    const newSpeed = speed - value;
    setSpeed(newSpeed);
  };

  return (
    <div>
      <h5>Set Tactics for {player.name}</h5>
      <div>
        <p>
          Available Speed: <span>{speed}</span>
        </p>
      </div>
      <div>
        <p>{player.name}'s Selections:</p>
        {player.actions.length > 0 && (
          <ul>
            {player.actions.map(action => (
              <li key={action.id} className="inline-content">
                <ActionCard
                  content={action}
                  adjustSpeed={adjustSpeed}
                  action={true}
                  player={player}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul>
        {playerOptions(speed).map((content, index) => (
          <li key={index} className="inline-content tight">
            <ActionCard
              content={content}
              action={false}
              player={player}
              adjustSpeed={adjustSpeed}
              speed={speed}
            />
          </li>
        ))}
      </ul>
      {!done && player.actions < 1 && (
        <>
          <p>
            {player.name} has NO actions selected. Do you want to advance
            anyway?
          </p>
          <Button className="btn" onClick={e => allDone()}>
            Advance with NO Actions
          </Button>
        </>
      )}
      {!done && player.actions.length > 0 && (
        <>
          <Button className="btn" onClick={e => allDone()}>
            Advance
          </Button>
        </>
      )}
      {done && <h5>Done setting {player.name}'s tactics</h5>}
    </div>
  );
};
