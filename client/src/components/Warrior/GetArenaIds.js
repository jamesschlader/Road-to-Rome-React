import React from "react";
import { Query } from "react-apollo";
import getArenasIds from "../../api/Arena/queries/getArenasIds";

export default ({ handleArenas }) => {
  return (
    <Query query={getArenasIds}>
      {({ loading, error, data }) => {
        if (error) {
          return <h3>Fucking error</h3>;
        }
        if (loading) {
          return null;
        }

        handleArenas(data.arenas);

        return <div />;
      }}
    </Query>
  );
};
