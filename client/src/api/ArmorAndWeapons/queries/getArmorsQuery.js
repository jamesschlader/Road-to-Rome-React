import { gql } from "apollo-boost";

const getArmorsQuery = gql`
  {
    armors {
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
`;

export default getArmorsQuery;
