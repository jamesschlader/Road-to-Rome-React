import { gql } from "apollo-boost";

const getArenasIds = gql`
  {
    arenas {
      id
      name
    }
  }
`;

export default getArenasIds;
