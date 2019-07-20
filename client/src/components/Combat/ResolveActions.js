import React, { useState, useEffect } from "react";
import { Button } from "react-materialize";
import ExecuteAction from "./ExecuteAction";

export default ({ actions, setMatchedActions, setPhase }) => {
  const [done, setDone] = useState(false);

  const removeAction = item => {
    const newArray = actions.filter(action => {
      return action.id !== item.id;
    });
    setMatchedActions(newArray);
  };

  useEffect(() => {
    actions.length < 1 && setDone(true);
  }, [actions]);

  console.log(`done is ${done}`);

  return (
    <div>
      <h5>Process actions in order</h5>

      {!done && (
        <ul>
          {actions.map((action, index) => (
            <ExecuteAction
              key={index}
              action={action}
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
