import { gql } from "apollo-boost";

const getWarriorsQuery = gql`
  {
    warriors {
      id
      name
      image
      male
      alive
      show
      Arena {
        id
        name
      }
    }
  }
`;

export default getWarriorsQuery;
