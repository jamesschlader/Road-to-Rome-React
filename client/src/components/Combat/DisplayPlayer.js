import React from "react";
import ShowStats from "./ShowStats";
import { Row } from "react-materialize";
import WarriorTinyCard from "../Shared/WarriorTinyCard";

export default ({ player, show, toggleShow }) => {
  const showDetails = warrior => {
    toggleShow(!show);
  };

  return (
    <>
      <Row>
        <WarriorTinyCard
          warrior={player}
          showDetails={showDetails}
          className="expand-content"
        />
      </Row>
      {show ? <ShowStats warrior={player} /> : null}
    </>
  );
};
