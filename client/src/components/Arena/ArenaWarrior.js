import React from "react";
import getSingleWarrior from "../../api/Warrior/queries/getSingleWarrior";
import { Query } from "react-apollo";
import Row from "react-materialize/lib/Row";

import WarriorInArena from "./WarriorInArena";

export default ({ warriorKey, setWarrior, MONEY_CONVERTER }) => {
  const WarriorResult = warriorId => (
    <Query
      query={getSingleWarrior}
      variables={{ warriorId }}
      pollInterval={300}
    >
      {({ loading, error, data }) => {
        if (error) return <h5>Error loading Warrior data... </h5>;
        if (loading) return <h5>Loading Warrior data... </h5>;

        return (
          <React.Fragment>
            <Row>
              <WarriorInArena
                warrior={data.warrior}
                setWarrior={setWarrior}
                MONEY_CONVERTER={MONEY_CONVERTER}
              />
            </Row>
          </React.Fragment>
        );
      }}
    </Query>
  );

  return <div>{WarriorResult(warriorKey)}</div>;
};
