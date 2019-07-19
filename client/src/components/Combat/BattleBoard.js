import React, { useState } from "react";
import PlaceActions from "./PlaceActions";
import DisplayMatchedActions from "./DisplayMatchedActions";
import { Button, Row } from "react-materialize";

export default ({ players, setPhase, matchedActions, setMatchedActions }) => {
  const [allFinished, setAllFinished] = useState(1);
  const [done, setDone] = useState(false);

  const allDone = () => {
    setDone(!done);

    setAllFinished(allFinished + 1);
  };

  return (
    <div>
      {allFinished < 3 && (
        <>
          {!done && (
            <PlaceActions
              player={players[0]}
              opponent={players[1]}
              matchedActions={matchedActions}
              setMatchedActions={setMatchedActions}
              allDone={allDone}
            />
          )}
          {done && (
            <PlaceActions
              player={players[1]}
              opponent={players[0]}
              matchedActions={matchedActions}
              setMatchedActions={setMatchedActions}
              allDone={allDone}
            />
          )}
        </>
      )}

      <Row>
        <DisplayMatchedActions matchedActions={matchedActions} />
      </Row>

      {allFinished === 3 && (
        <Button className="btn" onClick={e => setPhase(5)}>
          Move on
        </Button>
      )}
    </div>
  );
};
