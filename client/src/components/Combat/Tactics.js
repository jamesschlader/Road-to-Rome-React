import React, { useState } from "react";
import { Button } from "react-materialize";
import ActionCard from "./ActionCard";
import cardContent from "../../utilities/cardContent";

export default ({ player, decideReady, addAction, removeAction, actions }) => {
  const [done, setDone] = useState(false);
  const [speed, setSpeed] = useState(player.speed);
  const allDone = () => {
    player.actions = player.setActions(playerActions);
    console.log(player.actions);
    console.log(
      `expected fatigue for ${
        player.name
      }is ${player.countFatigueFromActions()}`
    );
    setDone(!done);
    decideReady();
  };
  const playerActions = actions.filter(action => {
    return action.playerId === player.name;
  });

  const playerOptions = value => {
    if (value === player.speed) {
      return cardContent;
    } else if (speed > 0) {
      return cardContent.filter(item => {
        return item.title !== "Full Defense";
      });
    } else {
      const obj = {
        title: "No Available Actions",
        name: "fatigue",
        value: 0,
        src: "/img/game-armor-images/magic-socks.svg"
      };
      return [obj];
    }
  };

  const adjustSpeed = value => {
    const newSpeed = speed - value;
    setSpeed(newSpeed);
  };

  console.log(`inside Tactics, player is `, player);
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
        {playerActions.length > 0 && (
          <ul>
            {playerActions.map(action => (
              <li key={action.id} className="inline-content">
                <ActionCard
                  content={action}
                  removeAction={removeAction}
                  adjustSpeed={adjustSpeed}
                  action={true}
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
              addAction={addAction}
              action={false}
              playerId={player.name}
              adjustSpeed={adjustSpeed}
              speed={speed}
            />
          </li>
        ))}
      </ul>
      {!done && (
        <Button className="btn" onClick={e => allDone()}>
          All done setting {player.name}'s tactics
        </Button>
      )}
      {done && <h5>Done setting {player.name}'s tactics</h5>}
    </div>
  );
};
