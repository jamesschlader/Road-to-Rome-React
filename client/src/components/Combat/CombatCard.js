import React from "react";
import { Card } from "react-materialize";

export default ({ player, turn }) => {
  return (
    <Card
      className="card-layout"
      title={player.name}
      style={{ backgroundColor: turn ? "green" : "#ccc" }}
    >
      <img src={player.image} alt={player.name} className="card-img" />
    </Card>
  );
};
