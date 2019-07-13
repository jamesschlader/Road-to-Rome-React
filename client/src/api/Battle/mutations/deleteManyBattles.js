import { gql } from "apollo-boost";

const deleteManyBattlesMutation = gql`
  mutation($ids: [ID]) {
    deleteManyBattles(ids: $ids) {
      id
    }
  }
`;
export { deleteManyBattlesMutation };
