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
      Arena {
        id
        name
        image
      }
      weaponsIdList
      armorIdList
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
