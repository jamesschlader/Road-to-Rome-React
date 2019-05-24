import { gql } from "apollo-boost";

const getSingleWarrior = gql`
  query($warriorId: ID) {
    warrior(id: $warriorId) {
      id
      name
      image
      male
      wallet
      strength
      speed
      stamina
      skill
      ArenaId

      winnings
      alive
    }
  }
`;
export default getSingleWarrior;
