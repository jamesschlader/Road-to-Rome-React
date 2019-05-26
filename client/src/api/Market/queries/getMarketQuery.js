import { gql } from "apollo-boost";

const getMarketQuery = gql`
  query($id: ID) {
    market(id: $id) {
      id
      name
      weaponIds
      weaponList {
        id
        name
        weight
        size
        damage
        cost
        costType
      }
      armorIds
      armorList {
        id
        name
        strength
        cost
        costType
        weight
        size
        shield
      }
      skillsUpgradeCost
      gearCostFactor
    }
  }
`;
export { getMarketQuery };
