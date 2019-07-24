import React, { useState, useEffect } from "react";
import { Button } from "react-materialize";
import ExecuteAction from "./ExecuteAction";

export default ({ actions, setMatchedActions, setPhase }) => {
  const [done, setDone] = useState(false);

  const removeAction = index => {
    const front = actions.slice(0, index);
    const back = actions.slice(index);
    back.shift();
    const newArray = [...front, ...back];
    setMatchedActions(newArray);
  };

  useEffect(() => {
    actions.length < 1 && setDone(true);
  }, [actions]);

  return (
    <div>
      <h5>Process actions in order</h5>

      {!done && (
        <ul>
          {actions.map((item, index) => (
            <ExecuteAction
              key={index}
              index={index}
              actions={item}
              finishAction={removeAction}
            />
          ))}
        </ul>
      )}

      {done && (
        <>
          <h5>Finished with actions </h5>
          <Button className="btn" onClick={e => setPhase(6)}>
            Go to recovery phase
          </Button>
        </>
      )}
    </div>
  );
};
