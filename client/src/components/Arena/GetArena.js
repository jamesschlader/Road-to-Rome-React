import { Query } from "react-apollo";
import getSingleArena from "../../api/Arena/queries/getSingleArena";
import React from "react";

export default ({ arena }) => {
  const id = arena.id;
  return (
    <div>
      <Query query={getSingleArena} variables={{ id }} errorPolicy="all">
        {({ loading, error, data }) => {
          if (error) {
            console.log(error.message);
            return <h3>Fucking error</h3>;
          }
          if (loading) {
            return (
              <div>
                <h3 className="center-align">Loading warriors...</h3>
                <div className="spinner-container">
                  <div className="spinner-primary" />
                </div>
              </div>
            );
          }

          console.log(data.arena);

          return (
            <div>
              <p>Got your arena</p>
            </div>
          );
        }}
      </Query>
    </div>
  );
};
