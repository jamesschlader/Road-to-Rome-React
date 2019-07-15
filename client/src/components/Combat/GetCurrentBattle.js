import React from "react";
import { Query } from "react-apollo";
import getSingleBattle from "../../api/Battle/queries/getSingleBattle";
import Spinner from "../Shared/Spinner";

export default ({ battle, setCurrentBattle }) => {
  const id = battle.id;
  return (
    <Query query={getSingleBattle} variables={{ id }}>
      {({ loading, error, data }) => {
        if (error) return <h3>Fucking error!</h3>;
        if (loading) {
          return <Spinner />;
        }
        setCurrentBattle(data.battle);
        return <div />;
      }}
    </Query>
  );
};
