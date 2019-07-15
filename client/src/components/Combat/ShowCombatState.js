import React from "react";

export default ({ vitals }) => {
  return (
    <div className="inline-content">
      <p>Current Stamina: {vitals.stamina}</p>
      <p>Current Speed: {vitals.speed}</p>
      <p>Fatigue: </p>
      <p>Wounds: </p>
    </div>
  );
};
