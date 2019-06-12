import React from "react";
import { Card } from "react-materialize";
import { Link } from "react-router-dom";

export default ({ warrior, showDetails, handleRedirect, context }) => {
  console.log(`warrior card, warrior: `, warrior);
  console.log(`warrior card, context: `, context);
  return (
    <React.Fragment>
      <Card
        key={warrior.id}
        className="card-layout"
        title={warrior.name}
        actions={[
          <div
            key={warrior.id}
            onClick={e => showDetails(warrior)}
            style={{ display: "inline-block" }}
          >
            <i className="material-icons">account_circle</i>
          </div>,

          <Link key={warrior.Arena.id} to="/arena">
            <div
              style={{ display: "inline-block", float: "right" }}
              onClick={e =>
                handleRedirect(context.setArena, context.RoadAuth, warrior)
              }
            >
              {warrior.alive ? <i className="material-icons">send</i> : null}
            </div>
          </Link>
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
