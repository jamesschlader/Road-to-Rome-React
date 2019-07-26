import React from "react";
import { Button } from "react-materialize";

export default ({ setStep }) => {
  return (
    <div>
      <Button className="btn" onClick={setStep(5)}>
        The Battle is over
      </Button>
    </div>
  );
};
