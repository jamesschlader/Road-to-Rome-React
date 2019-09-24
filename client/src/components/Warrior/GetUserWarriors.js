import React from "react";
import { Query } from "react-apollo";
import getUserWarriors from "../../api/User/queries/getUserWarriors";

export default ({ setStable, username }) => {
  return (
    <Query query={getUserWarriors} variables={{ username }} pollInterval={500}>
      {({ loading, error, data }) => {
        if (error) {
          return <h3>Error getting warriors</h3>;
        }
        if (loading) {
          return null;
        }
        console.log(`getting warriors: `, data);
        setStable(data.getUserWarriors.stable);
        return <div></div>;
      }}
    </Query>
  );
};
