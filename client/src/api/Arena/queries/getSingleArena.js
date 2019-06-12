import { gql } from "apollo-boost";

const getSingleArena = gql`
  query($id: ID) {
    arena(id: $id) {
      id
      name
      image
      gamesFrequency
      battleQuantity
      warriorIds
      warriorList {
        id
        name
        male
        wallet
        strength
        speed
        stamina
        skill
        winnings
        alive
      }
      userWarrior {
        id
        name
        image
        male
        wallet
        strength
        speed
        stamina
        skill
        winnings
        alive
      }
      battleIds
      scheduledBattles {
        id
        playerOne
        playerTwo
        purse
        scheduled
        date
      }
      battleArchive {
        id
        playerOne
        playerTwo
        winner
        purse
        scheduled
        date
      }
      MarketId
      Market {
        id
        name
        skillsUpgradeCost
        gearCostFactor
        armorIds
        weaponIds
        weaponList {
          id
          name
          damage
          weight
          size
          cost
          costType
        }
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
      }
    }
  }
`;
export default getSingleArena;
