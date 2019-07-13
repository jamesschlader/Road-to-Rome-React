import React from "react";
import { Card } from "react-materialize";

export default ({ warrior, showDetails }) => {
  return (
    <React.Fragment>
      <Card
        key={warrior.id}
        className="card-layout"
        title={warrior.name}
        onClick={e => {
          showDetails(warrior);
        }}
      >
        <img src={warrior.image} alt={warrior.name} className="card-img" />

        {warrior.Arena.name ? (
          <p>
            Current Arena: <strong>{warrior.Arena.name}</strong>
          </p>
        ) : (
          <p>No Arena Selected</p>
        )}
      </Card>
    </React.Fragment>
  );
};
