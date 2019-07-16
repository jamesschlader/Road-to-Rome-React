import React, { useState } from "react";
import ShowStats from "./ShowStats";
import WarriorTinyCard from "../Shared/WarriorTinyCard";

export default ({ player, toggleShow, left, show }) => {
  const [reveal, setReveal] = useState(false);
  const showDetails = warrior => {
    toggleShow(!show);
  };
  const classes = () => {
    return `side-content rounded-content-box ${
      left ? "side-left" : "side-right"
    } ${show ? "show" : ""}`;
  };
  return (
    <div style={{ position: "relative" }}>
      <WarriorTinyCard
        warrior={player}
        showDetails={showDetails}
        className="expand-content"
        onClick={e => setReveal(!reveal)}
      />
      {show ? (
        <div className={classes()}>
          <ShowStats warrior={player} />{" "}
        </div>
      ) : null}
    </div>
  );
};
