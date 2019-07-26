import React from "react";
import { Button } from "react-materialize";
import { updateBattleMutation } from "../../api/Battle/mutations/updateBattleMutation";
import { Mutation } from "react-apollo";

export default ({ setStep, setLocation, Battle, winner }) => {
  const handleExit = (newLocation = "/arena") => {
    setLocation(newLocation);
    setStep(6);
  };

  const updateBattle = () => {
    console.log(`winner is `, winner);
    const obj = {
      id: Battle.id,
      scheduled: false,
      winnerId: winner.id
    };
    console.log(`obj going to db is `, obj);
    return (
      <Mutation mutation={updateBattleMutation} variables={{ ...obj }}>
        {postMutation => (
          <Button
            className="btn"
            onClick={e => {
              postMutation();
              handleExit();
            }}
          >
            The battle is over
          </Button>
        )}
      </Mutation>
    );
  };
  return <div>{updateBattle()}</div>;
};
