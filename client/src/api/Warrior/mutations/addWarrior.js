import { gql } from "apollo-boost";

const addWarriorMutation = gql`
  mutation(
    $name: String
    $image: String
    $male: Boolean
    $wallet: Int
    $strength: Int
    $stamina: Int
    $speed: Int
    $skill: Int
    $ArenaId: ID
    $username: String
  ) {
    addWarrior(
      name: $name
      image: $image
      male: $male
      strength: $strength
      speed: $speed
      stamina: $stamina
      skill: $skill
      wallet: $wallet
      ArenaId: $ArenaId
      username: $username
    ) {
      id
      name
      image
    }
  }
`;

export { addWarriorMutation };
