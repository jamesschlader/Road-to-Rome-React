import React from "react";
import { Card } from "react-materialize";

export default ({ item, turn, add, remove, target }) => {
  const handleClick = item => {
    console.log(item);
    if (target && item.title === "Blank") {
      add(target);
    } else {
      if (item.title !== "Blank") {
        remove(item);
      }
    }
  };

  return (
    <Card
      className="card-layout"
      title={item.title === "Blank" ? "Blank" : item.owner.name}
      style={{ backgroundColor: turn ? "green" : "#ccc" }}
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
