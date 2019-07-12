import { gql } from "apollo-boost";

const addBattleMutation = gql`
  mutation(
    $ArenaId: ID
    $playerOneId: ID
    $playerTwoId: ID
    $purse: Int
    $date: String
    $scheduled: Boolean
  ) {
    addBattle(
      ArenaId: $ArenaId
      playerOneId: $playerOneId
      playerTwoId: $playerTwoId
      purse: $purse
      date: $date
      scheduled: $scheduled
    ) {
      id
      ArenaId
      playerOne {
        name
      }
      playerTwo {
        name
      }
      purse
      scheduled
      date
    }
  }
`;

export { addBattleMutation };
