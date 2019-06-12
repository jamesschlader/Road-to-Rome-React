import { gql } from "apollo-boost";

const addBattleToArena = gql`
  mutation($id: ID, $battleIds: [ID]) {
    updateArena(id: $id, battleIds: $battleIds) {
      id
      name
      scheduledBattles
    }
  }
`;

export { addBattleToArena };
