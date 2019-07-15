import React from "react";
import { Mutation } from "react-apollo";
import { Button } from "react-materialize";
import { addBattleMutation } from "../../api/Battle/mutations/addBattleMutation";

export default ({ playerOne, playerTwo, purse, arena, date, close }) => {
  function createBattle() {
    const battleData = {
      ArenaId: arena.id,
      playerOneId: playerOne,
      playerTwoId: playerTwo,
      purse,
      date,
      scheduled: true
    };

    return (
      <Mutation mutation={addBattleMutation} variables={{ ...battleData }}>
        {postMutation => (
          <Button
            className="btn selection-button"
            onClick={e => {
              close();
              postMutation();
            }}
          >
            Confirm
          </Button>
        )}
      </Mutation>
    );
  }

  return <div>{playerTwo && date ? createBattle() : null}</div>;
};
