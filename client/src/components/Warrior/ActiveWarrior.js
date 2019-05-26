import React from "react";

export default props => {
  return (
    <div>
      Active Warrior:
      <img
        src={props.warrior.image}
        alt={props.warrior.name}
        style={{ display: "inline-block", height: "5vw", width: "auto" }}
      />
      <h5 style={{ display: "inline-block" }}>{props.warrior.name}</h5>
    </div>
  );
};
