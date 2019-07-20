import React from "react";
import { Card } from "react-materialize";

export default ({ matchedActions }) => {
  return (
    <ul>
      {matchedActions.map(action => (
        <li key={action.id + action.owner.id}>
          <Card
            key={action.id}
            className="card-layout"
            header={<Header title={`${action.owner.name}'s Action`} />}
          >
            <img
              src={action.owner.image}
              alt={action.owner.name}
              className="card-img lock"
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};

const Header = ({ title }) => {
  return <p>{title}</p>;
};
