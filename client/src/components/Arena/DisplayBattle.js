import React from "react";
import { Query } from "react-apollo";
import { getSingleBattle } from "../../api/Battle/queries/getSingleBattle";

export default ({ battle }) => {
  const showBattle = id => (
    <Query
      query={getSingleBattle}
      variables={{ id: battle.id }}
      pollInterval={500}
    >
      {({ loading, error, data: { battle } }) => {
        if (error) return <p>Error loading Battle</p>;
        if (loading) return <p>Loading Battle</p>;
        console.log(battle);

        return (
          <React.Fragment>
            <li>
              <p>Battle goes here</p>
            </li>
          </React.Fragment>
        );
      }}
    </Query>
  );
  return <div>{showBattle()}</div>;
};
