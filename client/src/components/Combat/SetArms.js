import React from "react";
import { Button } from "react-materialize";

export default ({ setStep }) => {
  return (
    <div>
      <h5>Set Arms and Armor</h5>
      <Button className="btn" onClick={e => setStep(2)}>
        Push this button to advance the step
      </Button>
    </div>
  );
};
