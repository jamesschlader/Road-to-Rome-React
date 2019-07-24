import React from "react";
import { Card } from "react-materialize";

export default ({ item, turn, add, remove, target, player }) => {
  const handleClick = item => {
    if (turn < 3) {
      if (target && item.title === "Blank") {
        add(target, item);
      } else {
        if (item.title !== "Blank") {
          if (turn === player) {
            remove(item);
          }
        }
      }
    }
  };

  return (
    <Card
      className="card-layout small"
      title={item.title === "Blank" ? "Blank" : item.owner.name}
      style={{ backgroundColor: "#ccc" }}
      onClick={e => handleClick(item)}
    >
      <img
        src={item.title === "Blank" ? item.image : item.owner.image}
        alt={item.title}
        className="card-img"
      />
    </Card>
  );
};
