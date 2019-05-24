import React from "react";
import Button from "react-materialize/lib/Button";
import { Query } from "react-apollo";
import getSingleWarrior from "../../api/Warrior/queries/getSingleWarrior";

export default ({ showDetails, warrior }) => {
  const SingleWarrior = warriorId => (
    <Query query={getSingleWarrior} variables={{ warriorId }}>
      {({ loading, error, data }) => {
        console.log(warrior.id);
        if (error)
          return <h3>There was an error loading the Warrior's details...</h3>;
        if (loading) return <h3>Loading Warrior details...</h3>;
        console.log(data);
        return (
          <div>
            <h3>{data.warrior.name}</h3>
            <Button onClick={e => showDetails(warrior)}>Back</Button>
          </div>
        );
      }}
    </Query>
  );
  return <div>{SingleWarrior(warrior.id)}</div>;
};
