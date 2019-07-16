import React, { useState, useEffect } from "react";
import { Card } from "react-materialize";

export default ({ content, processCard, turn }) => {
  const { title, src, name, value } = content;
  const [selected, setSelected] = useState(false);
  const [currentTurn, setCurrentTurn] = useState();

  useEffect(() => {
    if (currentTurn !== turn) {
      setSelected(false);
      setCurrentTurn(turn);
    }
  }, [turn]);

  const handleClick = (name, value) => {
    setSelected(!selected);
    return selected ? processCard(name, value * -1) : processCard(name, value);
  };

  return (
    <Card
      key={title}
      name={name}
      value={value}
      className="card-layout tight"
      onClick={e => handleClick(name, value)}
      header={<Header title={title} />}
      style={{ backgroundColor: selected && "green" }}
    >
      <img src={src} alt={title} className="card-img lock" />
    </Card>
  );
};

const Header = ({ title }) => {
  return <p>{title}</p>;
};
