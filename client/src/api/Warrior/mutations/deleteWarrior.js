import { gql } from "apollo-boost";

const deleteWarriorMutation = gql`
  mutation($id: ID) {
    deleteWarrior(id: $id) {
      name
      id
    }
  }
`;
export { deleteWarriorMutation };
