import React from "react";
import { Button } from "react-materialize";
import { updateBattleMutation } from "../../api/Battle/mutations/updateBattleMutation";
import { Mutation } from "react-apollo";

export default ({ setStep, setLocation, Battle, winner, Warrior }) => {
  const handleExit = (newLocation = "/arena") => {
    if (winner.id !== Warrior.id) {
      newLocation = "/warrior";
    }
    setLocation(newLocation);
    setStep(6);
  };

  const updateBattle = () => {
    const obj = {
      id: Battle.id,
      scheduled: false,
      winnerId: winner.id
    };
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
