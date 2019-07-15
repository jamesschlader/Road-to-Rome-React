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
      livingWarriors {
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
        Arena {
          id
          name
        }
        nextScheduledBattle {
          id
          date
          Arena {
            id
            name
          }
          playerOne {
            id
            name
          }
          playerTwo {
            id
            name
          }
          purse
        }
        armorList {
          id
          name
          strength
          weight
          size
          cost
          costType
          shield
        }
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

      battleIds
      scheduledBattles {
        id
        date
        purse
        playerOne {
          id
          name
        }
        playerTwo {
          id
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
