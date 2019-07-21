import React from "react";
import { Card } from "react-materialize";

export default ({ matchedActions, handleSelection }) => {
  return (
    <ul>
      {matchedActions.map(action => (
        <li key={action.id} className="inline-content">
          <Card
            key={action.id}
            className="card-layout inline-content"
            header={<Header title={`${action.owner.name}'s Action`} />}
            onClick={e => handleSelection(action)}
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
