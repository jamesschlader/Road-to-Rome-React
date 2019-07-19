import React from "react";
import { Button } from "react-materialize";

export default ({ setStep, setLocation }) => {
  const handleExit = (newLocation = "/arena") => {
    setLocation(newLocation);
    setStep(6);
  };
  return (
    <div>
      <Button className="btn" onClick={e => handleExit()}>
        Review results and press this button to go on
      </Button>
    </div>
  );
};
