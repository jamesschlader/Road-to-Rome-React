import React from "react";

export default props => {
  return (
    <div>
      <img
        src={props.warrior.image}
        alt={props.warrior.name}
        style={{ display: "inline-block", height: "5vw", width: "auto" }}
      />
      <h3 style={{ display: "inline-block" }}>{props.warrior.name}</h3>
    </div>
  );
};
