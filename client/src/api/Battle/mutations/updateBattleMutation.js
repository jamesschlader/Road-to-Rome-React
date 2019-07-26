import { gql } from "apollo-boost";

const updateBattleMutation = gql`
  mutation($id: ID, $winnerId: ID, $scheduled: Boolean) {
    updateBattle(id: $id, winnerId: $winnerId, scheduled: $scheduled) {
      id
      playerOne {
        id
        name
        winnings
        alive
      }
      playerTwo {
        id
        name
        winnings
        alive
      }
      scheduled
      purse
      winner {
        name
      }
    }
  }
`;
export { updateBattleMutation };
