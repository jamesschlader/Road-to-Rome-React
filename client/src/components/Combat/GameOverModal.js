import React from "react";
import { Button } from "react-materialize";

export default ({ setStep }) => {
  return (
    <div>
      <Button className="btn" onClick={e => setStep(5)}>
        The battle is over. Close the modal.
      </Button>
    </div>
  );
};
