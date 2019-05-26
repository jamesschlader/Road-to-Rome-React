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
      Arena {
        id
        name
        image
      }
      nextScheduledBattle {
        id
        ArenaId
        playerOne
        playerTwo
        purse
      }
      battlesList {
        id
        ArenaId
        playerOne
        playerTwo
        winner
        purse
        scheduled
      }
      winnings
      alive
      armorIdList
      armorList {
        id
        name
        strength
        weight
        size
        cost
        costType
      }
      weaponsIdList
      weaponList {
        id
        name
        damage
        weight
        size
        cost
        costType
      }
    }
  }
`;
export default getSingleWarrior;
