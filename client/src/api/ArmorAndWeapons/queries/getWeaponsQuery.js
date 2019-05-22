import { gql } from "apollo-boost";

const getWeaponsQuery = gql`
  {
    weapons {
      id
      name
      damage
      cost
      costType
      weight
      size
    }
  }
`;

export default getWeaponsQuery;
