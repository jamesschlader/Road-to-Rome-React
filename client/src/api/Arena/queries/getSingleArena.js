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
        image
        male
        wallet
        strength
        speed
        stamina
        skill
        winnings
        alive
        nextScheduledBattle {
          id
          date
        }
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
        date
        playerOne {
          name
        }
        playerTwo {
          name
        }
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
