import React from "react";
import { Card } from "react-materialize";

export default ({ warrior, showDetails }) => {
  return (
    <React.Fragment>
      <Card
        key={warrior.id}
        className="card-layout"
        title={warrior.name}
        actions={[
          <div
            key={warrior.id}
            onClick={e => {
              showDetails(warrior);
            }}
            style={{ display: "inline-block" }}
          >
            <i className="material-icons">account_circle</i>
          </div>
        ]}
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
