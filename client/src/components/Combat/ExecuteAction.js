import React from "react";
import { Button } from "react-materialize";

export default ({ action, finishAction }) => {
  return (
    <div>
      <p>{action.title}</p>
      <Button className="btn" onClick={e => finishAction(action)}>
        Push this to resolve this action
      </Button>
    </div>
  );
};
