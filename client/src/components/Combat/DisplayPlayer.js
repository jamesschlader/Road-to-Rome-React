import React from "react";
import ShowStats from "./ShowStats";
import WarriorTinyCard from "../Shared/WarriorTinyCard";

export default ({ player, show, toggleShow, left }) => {
  const showDetails = warrior => {
    toggleShow(!show);
  };
  const classes = () => {
    return `side-content rounded-content-box ${
      left ? "side-left" : "side-right"
    }`;
  };
  return (
    <>
      <WarriorTinyCard
        warrior={player}
        showDetails={showDetails}
        className="expand-content"
      />

      {show ? (
        <div className={classes()}>
          <ShowStats warrior={player} />{" "}
        </div>
      ) : null}
    </>
  );
};
