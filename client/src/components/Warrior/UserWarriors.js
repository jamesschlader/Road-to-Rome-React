import React from "react";
import WarriorCard from "./WarriorCard";

export default ({ showDetails, stable }) => {
  const showWarriors = stable.map(warrior => (
    <li key={warrior.id} style={{ display: "inline-block", padding: 8 }}>
      <WarriorCard warrior={warrior} showDetails={showDetails} />
    </li>
  ));
  return (
    <div>
      {showWarriors.length > 0 ? (
        showWarriors
      ) : (
        <h3>No warriors to display.</h3>
      )}
    </div>
  );
};
