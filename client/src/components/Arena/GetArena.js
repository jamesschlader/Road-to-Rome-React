import { Query } from "react-apollo";
import getSingleArena from "../../api/Arena/queries/getSingleArena";
import React from "react";
import Spinner from "../Shared/Spinner";

export default ({ arena, setActiveArena }) => {
  const id = arena.id;
  return (
    <Query query={getSingleArena} variables={{ id }} errorPolicy="all">
      {({ loading, error, data }) => {
        if (error) {
          return <h3>Fucking error</h3>;
        }
        if (loading) {
          return (
            <div>
              <h3>Loading Arena...</h3>
              <Spinner />
            </div>
          );
        }

        setActiveArena(data.arena);

        return <div />;
      }}
    </Query>
  );
};
