import React from "react";
import { Mutation } from "react-apollo";
import { Button } from "react-materialize";
import { addBattleMutation } from "../../api/Battle/mutations/addBattleMutation";
import { addBattleToArena } from "../../api/Arena/mutations/addBattleToArena";

export default ({ playerOne, playerTwo, purse, arena }) => {
  console.log(`arena = `, arena);

  function createBattle() {
    const battleData = {
      ArenaId: arena.id,
      playerOne,
      playerTwo,
      purse,
      battleIds: arena.battleIds,
      date: new Date().toString()
    };
    console.log(`battleData = `, battleData);
    return (
      <Mutation mutation={addBattleMutation} variables={{ ...battleData }}>
        {postMutation => (
          <Button
            className="btn"
            onClick={e => {
              postMutation().then(battle => {
                const { addBattle } = battle.data;
                console.log(addBattle);
                return <p>All done</p>;
              });
            }}
          >
            Confirm
          </Button>
        )}
      </Mutation>
    );
  }

  return <div>{createBattle()}</div>;
};
