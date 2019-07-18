import React, { useState, useEffect } from "react";
import { Button } from "react-materialize";

export default ({
  player,
  allDone,
  matchedActions,
  setMatchedActions,
  opponent
}) => {
  const [done, setDone] = useState(false);
  const [placed, setPlaced] = useState([]);

  const unfinishedBusiness = () => {
    const placedIds = placed.map(item => item.id);
    return player.actions.filter(action => {
      return !placedIds.includes(action.id) && action;
    });
  };

  const handleSelection = item => {
    const matchAction = { ...item };
    if (matchAction.title.includes("fense")) {
      matchAction.player = opponent;
      matchAction.opponent = player;
    } else {
      matchAction.player = player;
      matchAction.opponent = opponent;
    }

    const newSelections = [...placed, matchAction];
    setPlaced(newSelections);

    const newMatches = [...matchedActions, matchAction];
    setMatchedActions(newMatches);
  };

  useEffect(() => {
    const business = unfinishedBusiness();

    business.length < 1 && setDone(!done);
  }, [matchedActions]);

  return (
    <div>
      <h5>Place actions for {player.name}</h5>

      {!done && (
        <>
          {" "}
          <p>set the actions here</p>
          <ul>
            {unfinishedBusiness().map(action => (
              <li key={action.id + player.id}>
                <p>{action.title}</p>
                <Button className="btn" onClick={e => handleSelection(action)}>
                  Place {action.title}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {done && (
        <>
          <Button className="btn" onClick={e => allDone()}>
            All done placing {player.name}'s actions
          </Button>
        </>
      )}
    </div>
  );
};
