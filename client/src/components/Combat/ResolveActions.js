import React, { useState, useEffect } from "react";
import { Button } from "react-materialize";
import ExecuteAction from "./ExecuteAction";
import Action from "../../utilities/Action";

export default ({ actions, setMatchedActions, setPhase }) => {
  const [done, setDone] = useState(false);
  const [woundedPlayer, setWoundedPlayer] = useState(null);
  const [workingActions, setWorkingActions] = useState(actions);

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

  useEffect(() => {
    if (woundedPlayer) {
      const { player, action, index } = woundedPlayer;

      const cancelActions = actions
        .map(pair => {
          return pair.filter(item => {
            return item.owner.id === player.id ? item : null;
          })[0];
        })
        .filter(item => {
          return item.id !== action.id;
        });

      const cancelIds = cancelActions.map(item => item.id);

      const doctoredActions = actions.map(pair => {
        return pair.map(item => {
          return cancelIds.includes(item.id)
            ? new Action(
                Date.now(),
                "fatigue",
                "Replacement",
                player.image,
                0,
                0,
                player
              )
            : item;
        });
      });
      cancelActions.map(action => player.removeAction(action));
      removeAction(index);
      // setWorkingActions(doctoredActions);
    }
  }, [woundedPlayer]);

  return (
    <div>
      <h5>Process actions in order</h5>

      {!done && (
        <ul>
          {workingActions.map((pair, index) => (
            <ExecuteAction
              key={index}
              index={index}
              actions={pair}
              finishAction={removeAction}
              setWoundedPlayer={setWoundedPlayer}
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
