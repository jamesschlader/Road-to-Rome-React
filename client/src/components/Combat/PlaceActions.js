import React, { useState, useEffect } from "react";
import { Button, Row } from "react-materialize";

export default ({ player, allDone, matchedActions, handlePositions }) => {
  const [done, setDone] = useState(false);
  const [placed, setPlaced] = useState([]);

  const unfinishedBusiness = () => {
    const placedIds = placed.map(item => item.id);
    return player.actions.filter(action => {
      console.log(action);
      return !placedIds.includes(action.id) && action;
    });
  };

  const handleSelection = item => {
    const matchAction = { ...item };
    matchAction.owner = player;
    const newSelections = [...placed, matchAction];
    setPlaced(newSelections);

    handlePositions(matchAction);
  };

  useEffect(() => {
    const business = unfinishedBusiness();

    if (business.length === 1) {
      const matchAction = player.actions[0];
      matchAction.owner = player;
      setPlaced(matchAction);
      handlePositions(matchAction);
      setDone(!done);
    }
  }, [player]);
  console.log(unfinishedBusiness().map(item => console.log(item)));
  return (
    <div>
      <h5>Place actions for {player.name}</h5>

      {!done && (
        <>
          {" "}
          <Row>
            {unfinishedBusiness().map((card, index) => (
              <li key={index} className="inline-content">
                />
              </li>
            ))}
          </Row>
          <p>set the actions here</p>
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
