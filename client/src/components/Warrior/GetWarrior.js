import React from "react";
import { Query } from "react-apollo";
import Spinner from "../Shared/Spinner";
import getSingleWarrior from "../../api/Warrior/queries/getSingleWarrior";

export default ({ id, setWarrior }) => {
  return (
    <Query query={getSingleWarrior} variables={{ warriorId: id }}>
      {({ loading, error, data }) => {
        if (error) return <h3>Error loading the warrior...</h3>;
        if (loading) {
          return (
            <div>
              <h3>Loading Warrior...</h3>
              <Spinner />
            </div>
          );
        }

        setWarrior(data.warrior);
        return <div />;
      }}
    </Query>
  );
};
