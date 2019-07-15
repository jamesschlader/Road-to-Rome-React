import React from "react";
import { Card } from "react-materialize";

export default ({ content }) => {
  const { title, src } = content;
  return (
    <Card
      key={title}
      className="card-layout tight"
      header={<Header title={title} />}
    >
      <img src={src} alt={title} className="card-img lock" />
    </Card>
  );
};

const Header = ({ title }) => {
  return <p>{title}</p>;
};
