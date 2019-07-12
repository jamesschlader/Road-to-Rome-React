import React from "react";
import { Mutation } from "react-apollo";
import { Button } from "react-materialize";
import { addBattleMutation } from "../../api/Battle/mutations/addBattleMutation";

export default ({ playerOne, playerTwo, purse, arena, date, close }) => {
  console.log(`arena = `, arena);

  function createBattle() {
    console.log(`playerOne is `, playerOne);

    const battleData = {
      ArenaId: arena.id,
      playerOneId: playerOne,
      playerTwoId: playerTwo,
      purse,
      date,
      scheduled: true
    };
    console.log(`battleData = `, battleData);

    return (
      <Mutation mutation={addBattleMutation} variables={{ ...battleData }}>
        {postMutation => (
          <Button
            className="btn selection-button"
            onClick={e => {
              postMutation().then(battle => {
                const { addBattle } = battle.data;
                console.log(addBattle);
                close();
              });
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
