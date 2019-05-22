import { gql } from "apollo-boost";

const getArenasQuery = gql`
  {
    arenas {
      id
      name
      image
      gamesFrequency
      battleQuantity
      warriorIds
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
export default getArenasQuery;
