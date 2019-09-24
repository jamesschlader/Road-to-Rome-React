import { gql } from "apollo-boost";

const getUserWarriors = gql`
  query($username: String) {
    getUserWarriors(username: $username) {
      stable {
        id
        username
        name
        image
        male
        wallet
        alive
        show
        winnings
        strength
        speed
        stamina
        skill
        ArenaId
        Arena {
          id
          name
          image
        }
        nextScheduledBattle {
          id
          date
          ArenaId
          Arena {
            id
            name
          }
          playerOne {
            name
          }
          playerTwo {
            name
          }
          purse
        }
        battlesList {
          id
          date
          ArenaId
          playerOne {
            name
          }
          playerTwo {
            name
          }
          winner {
            name
          }
          purse
          scheduled
        }
        armorIdList
        armorList {
          id
          name
          strength
          weight
          size
          cost
          costType
          shield
        }
        weaponsIdList
        weaponList {
          id
          name
          damage
          weight
          size
          cost
          costType
        }
      }
    }
  }
`;

export default getUserWarriors;
