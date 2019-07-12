import { gql } from "apollo-boost";

const getWarriorsQuery = gql`
  {
    warriors {
      id
      name
      image
      male
      wallet
      strength
      speed
      stamina
      skill
      ArenaId
      winnings
      alive
      show
      Arena {
        id
        name
        image
        gamesFrequency
        battleQuantity
        Market {
          id
          name
          weaponIds
          weaponList {
            id
            name
            damage
            cost
            costType
            weight
            image
            size
          }
          armorIds
          armorList {
            id
            name
            strength
            cost
            costType
            weight
            image
            shield
            size
          }
          skillsUpgradeCost
          gearCostFactor
        }
        warriorIds
        livingWarriors {
          id
          name
          image
          male
          wallet
          strength
          speed
          stamina
          skill
          winnings
          alive
          show
          armorIdList
          armorList {
            id
            name
            strength
            cost
            costType
            weight
            shield
            size
          }
          weaponsIdList
          weaponList {
            id
            name
            damage
            cost
            costType
            weight
            size
          }
          battlesIdList
          battlesList {
            date
            purse
            winner {
              id
              name
            }
            playerOne {
              id
              name
            }
            playerTwo {
              id
              name
            }
          }
          nextScheduledBattle {
            id
            date
            purse
            playerOne {
              id
              name
            }
            playerTwo {
              id
              name
            }
          }
        }
        battleIds
        scheduledBattles {
          id
          date
          purse
          playerOne {
            id
            name
          }
          playerTwo {
            id
            name
          }
        }
        battleArchive {
          id
          date
          purse
          winner {
            id
            name
          }
        }
      }
      armorIdList
      armorList {
        id
        name
        strength
        cost
        costType
        weight
        shield
        size
      }
      weaponsIdList
      weaponList {
        id
        name
        damage
        cost
        costType
        weight
        size
      }
      nextScheduledBattle {
        id
        ArenaId
        Arena {
          id
          name
        }
        date
        purse
        playerOne {
          id
          name
        }
        playerTwo {
          id
          name
        }
      }
      battlesList {
        id
        ArenaId
        date
        winner {
          id
          name
        }
        purse
        scheduled
        playerOne {
          id
          name
        }
        playerTwo {
          id
          name
        }
      }
    }
  }
`;

export default getWarriorsQuery;
