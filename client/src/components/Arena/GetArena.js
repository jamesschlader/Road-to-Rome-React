import { Query } from "react-apollo";
import getSingleArena from "../../api/Arena/queries/getSingleArena";
import React from "react";

export default ({ arena, setActiveArena }) => {
  const id = arena.id;
  return (
    <Query
      query={getSingleArena}
      variables={{ id }}
      errorPolicy="all"
      pollInterval={500}
    >
      {({ loading, error, data }) => {
        if (error) {
          return <h3>Fucking error</h3>;
        }
        if (loading) {
          return null;
        }
        console.log(`getting arena: `, data.arena);
        setActiveArena(data.arena);

        return <div />;
      }}
    </Query>
  );
};
