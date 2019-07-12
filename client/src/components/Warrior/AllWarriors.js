import React from "react";
import { Query } from "react-apollo";
import getWarriorsQuery from "../../api/Warrior/queries/getWarriorsQuery";
import WarriorCard from "./WarriorCard";

export default props => {
  return (
    <div>
      <Query query={getWarriorsQuery} pollInterval={500}>
        {({ loading, error, data }) => {
          if (error) return <h3>There was and error loading the warriors.</h3>;
          if (loading)
            return <h3 className="center-align">Loading warriors...</h3>;
          const showWarriors = data.warriors.filter(item => {
            return item.show;
          });

          return showWarriors.length > 0 ? (
            showWarriors.map(warrior => (
              <li
                key={warrior.id}
                style={{ display: "inline-block", padding: 8 }}
              >
                <WarriorCard
                  warrior={warrior}
                  selectCard={props.selectCard}
                  showDetails={props.showDetails}
                  context={props.context}
                  handleRedirect={props.handleRedirect}
                />
              </li>
            ))
          ) : (
            <h3>No warriors to display</h3>
          );
        }}
      </Query>
    </div>
  );
};
