import { gql } from "apollo-boost";

const addBattleMutation = gql`
  mutation(
    $ArenaId: ID
    $playerOne: ID
    $playerTwo: ID
    $purse: Int
    $battleIds: [ID]
    $date: String
  ) {
    addBattle(
      ArenaId: $ArenaId
      playerOne: $playerOne
      playerTwo: $playerTwo
      purse: $purse
      battleIds: $battleIds
      date: $date
    ) {
      id
      ArenaId
      playerOne
      playerTwo
      purse
      scheduled
      date
    }
  }
`;

export { addBattleMutation };
