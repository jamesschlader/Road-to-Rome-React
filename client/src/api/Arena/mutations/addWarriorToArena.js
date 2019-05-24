import { gql } from "apollo-boost";

const addWarriorToArena = gql`
  mutation($arenaId: ID, $warriorId: [ID]) {
    updateArena(id: $id, warriorIds: $warriorId) {
      name
      warriorIds
    }
  }
`;
export { addWarriorToArena };
