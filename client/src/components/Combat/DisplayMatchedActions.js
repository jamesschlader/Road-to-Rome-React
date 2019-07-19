import React from "react";
import { Card } from "react-materialize";

export default ({ matchedActions }) => {
  console.log(matchedActions[0]);
  const me = action => {
    return action.title.includes("fense") ? action.opponent : action.player;
  };
  const altText = action => {
    return `${me(action).name} ${action.title}`;
  };
  const titleText = text => {
    return `${text}'s Action`;
  };
  return (
    <ul>
      {matchedActions.map((action, index) => (
        <li key={action.id + me(action).id}>
          <Card
            key={action.id}
            className="card-layout"
            header={<Header title={titleText(me(action).name)} />}
          >
            <img
              src={me(action).image}
              alt={altText(action)}
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
