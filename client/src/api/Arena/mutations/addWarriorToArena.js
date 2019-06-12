import { gql } from "apollo-boost";

const addWarriorToArena = gql`
  mutation($arenaId: ID, $warriorId: [ID]) {
    updateArena(id: $arenaId, warriorIds: $warriorId) {
      name
      warriorIds
    }
  }
`;
export { addWarriorToArena };
