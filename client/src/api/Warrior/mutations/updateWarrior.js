import { gql } from "apollo-boost";

const updateWarriorMutation = gql`
  mutation(
    $id: ID
    $name: String
    $image: String
    $male: Boolean
    $wallet: Int
    $strength: Int
    $stamina: Int
    $speed: Int
    $skill: Int
    $ArenaId: ID
    $winnings: Int
    $alive: Boolean
    $weaponsIdList: [ID]
    $armorIdList: [ID]
    $battlesIdList: [ID]
  ) {
    updateWarrior(
      id: $id
      name: $name
      image: $image
      male: $male
      wallet: $wallet
      strength: $strength
      speed: $speed
      stamina: $stamina
      skill: $skill
      winnings: $winnings
      ArenaId: $ArenaId
      alive: $alive
      weaponsIdList: $weaponsIdList
      armorIdList: $armorIdList
      battlesIdList: $battlesIdList
    ) {
      id
      name
    }
  }
`;
export { updateWarriorMutation };
