import { gql } from "apollo-boost";

const getSingleBattle = gql`
  query($id: ID) {
    battle(id: $id) {
      id
      playerOne {
        id
        name
        image
        male
        wallet
        strength
        speed
        skill
        stamina
        winnings
        alive
        show
        armorList {
          id
          name
          strength
          weight
          shield
          size
        }
        weaponList {
          id
          name
          damage
          weight
          size
        }
      }
      playerTwo {
        id
        name
        image
        male
        wallet
        strength
        speed
        skill
        stamina
        winnings
        alive
        show
        armorList {
          name
          strength
          weight
          shield
          size
        }
        weaponList {
          name
          damage
          weight
          size
        }
      }
      purse
      date
      winner {
        id
        name
      }
      ArenaId
    }
  }
`;

export default getSingleBattle;
