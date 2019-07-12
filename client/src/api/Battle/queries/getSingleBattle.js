import { gql } from "apollo-boost";

const getSingleBattle = gql`
  query($id: ID) {
    battle(id: $id) {
      id
      playerOne {
        name
      }
      playerTwo {
        name
      }
      purse
      date
      winner
      ArenaId
    }
  }
`;

export { getSingleBattle };
