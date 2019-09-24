import { gql } from "apollo-boost";

const deleteWarriorMutation = gql`
  mutation($id: ID, $username: String) {
    deleteWarrior(id: $id, username: $username) {
      name
      id
    }
  }
`;
export { deleteWarriorMutation };
