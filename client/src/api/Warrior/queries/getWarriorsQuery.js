import { gql } from "apollo-boost";

const getWarriorsQuery = gql`
  {
    warriors {
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
      show
      Arena {
        id
        name
        image
      }
      armorIdList
      armorList {
        id
        name
        strength
        cost
        costType
        weight
        shield
        size
      }
      weaponsIdList
      weaponList {
        id
        name
        damage
        cost
        costType
        weight
        size
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
    }
  }
`;

export default getWarriorsQuery;
