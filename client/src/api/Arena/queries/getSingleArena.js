import { gql } from "apollo-boost";

const getSingleArena = gql`
  query($id: ID, $warriorId: ID) {
    arena(id: $id, warriorId: $warriorId) {
      id
      name
      image
      gamesFrequency
      battleQuantity
      warriorIds
      warriorList {
        id
        name
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
      MarketId
      Market {
        name
        skillsUpgradeCost
        gearCostFactor
        armorIds
        weaponIds
        weaponList {
          name
          damage
          weight
          size
          cost
          costType
        }
        armorList {
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
