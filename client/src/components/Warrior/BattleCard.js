import React, { Fragment } from "react";
import { Card } from "react-materialize";

export default function BattleCard({ candidate, opponent, setOpponent }) {
  return (
    <Fragment>
      <Card
        key={candidate.id}
        className="card-layout"
        title={candidate.name}
        onClick={e => setOpponent(candidate)}
        style={{
          display: "inline-block",
          margin: "5px",
          backgroundColor: candidate.name === opponent.name ? "green" : "white"
        }}
      >
        <img src={candidate.image} alt={candidate.name} className="card-img" />
      </Card>
    </Fragment>
  );
}
