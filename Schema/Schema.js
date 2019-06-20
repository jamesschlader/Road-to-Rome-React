const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat
} = graphql;

const { Arena } = require("../Models/Arena");
const { Warrior } = require("../Models/Warrior");
const { Weapon } = require("../Models/Weapon");
const { Armor } = require("../Models/Armor");
const { Market } = require("../Models/Market");
const { Battle } = require("../Models/Battle");

const ArenaType = new GraphQLObjectType({
  name: "Arena",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    gamesFrequency: { type: GraphQLInt },
    battleQuantity: { type: GraphQLInt },
    warriorIds: { type: new GraphQLList(GraphQLID) },
    warriorList: {
      type: new GraphQLList(WarriorType),
      resolve(parent, args) {
        return parent.warriorIds.map(id => Warrior.findById({ _id: id }));
      }
    },
    userWarrior: {
      type: new GraphQLList(WarriorType),
      resolve(parent, args) {
        const result = parent.warriorIds.filter(id => {
          if (id === args.warriorId) return Warrior.findById({ _id: id });
        });
        return result;
      }
    },
    battleIds: { type: new GraphQLList(GraphQLID) },
    scheduledBattles: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battleIds.map(id => {
          return Battle.find({ _id: id, scheduled: true }).then(result => {
            return result[0];
          });
        });
      }
    },
    battleArchive: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battleIds.map(id =>
          Battle.find(id).then(battle => {
            console.log(battle);
            return battle[0];
          })
        );
      }
    },
    MarketId: {
      type: GraphQLID
    },
    Market: {
      type: MarketType,
      resolve(parent, args) {
        return Market.findById({ _id: parent.MarketId });
      }
    }
  })
});

const WarriorType = new GraphQLObjectType({
  name: "Warrior",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    male: { type: GraphQLBoolean },
    wallet: { type: GraphQLInt },
    strength: { type: GraphQLInt },
    speed: { type: GraphQLInt },
    stamina: { type: GraphQLInt },
    skill: { type: GraphQLInt },
    ArenaId: { type: GraphQLID },
    Arena: {
      type: ArenaType,
      resolve(parent, args) {
        return !parent.ArenaId
          ? Arena.find({ name: "Carthago" }).then(result => {
              parent.ArenaId = result[0]._id;
              parent.save();
              return result[0];
            })
          : Arena.findById({ _id: parent.ArenaId });
      }
    },

    armorIdList: {
      type: new GraphQLList(GraphQLID)
    },
    armorList: {
      type: new GraphQLList(ArmorType),
      resolve(parent, args) {
        return parent.armorIdList.length > 0
          ? parent.armorIdList.map(id => Armor.findById({ _id: id }))
          : Armor.find({ name: "None" }).then(result => {
              parent.armorList = result;
              parent.save();
              return result;
            });
      }
    },

    weaponsIdList: { type: new GraphQLList(GraphQLID) },

    weaponList: {
      type: new GraphQLList(WeaponType),
      resolve(parent, args) {
        return parent.weaponsIdList.length > 0
          ? parent.weaponsIdList.map(id => Weapon.findById({ _id: id }))
          : Weapon.find({ name: "Fists" }).then(result => {
              parent.weaponList = result;
              parent.save();
              return result;
            });
      }
    },

    battlesIdList: { type: new GraphQLList(GraphQLID) },

    battlesList: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battlesIdList.map(id =>
          Battles.findById(id).then(battle => {
            console.log(`from battleList of warrior ${parent.name}`, battle);
            return battle[0];
          })
        );
      }
    },
    nextScheduledBattle: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battlesIdList.map(id =>
          Battle.find({ _id: id }, { scheduled: true }).then(battle => {
            console.log(
              `from nextScheduledBattle of warrior ${parent.name}`,
              battle
            );
            return battle[0];
          })
        );
      }
    },
    winnings: { type: GraphQLInt },
    alive: { type: GraphQLBoolean },
    show: { type: GraphQLBoolean }
  })
});

const MarketType = new GraphQLObjectType({
  name: "Market",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    weaponIds: { type: new GraphQLList(GraphQLID) },
    weaponList: {
      type: new GraphQLList(WeaponType),
      resolve(parent, args) {
        return parent.weaponIds.map(id => Weapon.findById({ _id: id }));
      }
    },
    armorIds: { type: new GraphQLList(GraphQLID) },
    armorList: {
      type: new GraphQLList(ArmorType),
      resolve(parent, args) {
        return parent.armorIds.map(id => Armor.findById({ _id: id }));
      }
    },
    skillsUpgradeCost: { type: GraphQLInt },
    gearCostFactor: { type: GraphQLFloat }
  })
});

const BattleType = new GraphQLObjectType({
  name: "Battle",
  fields: () => ({
    id: { type: GraphQLID },
    ArenaId: { type: GraphQLID },
    Arena: {
      type: ArenaType,
      resolve(parent, args) {
        return Arena.findById({ _id: parent.ArenaId });
      }
    },
    players: { type: new GraphQLList(GraphQLID) },
    playerOne: {
      type: WarriorType,
      resolve(parent, args) {
        return parent.players ? Warrior.findById(parent.players[0]) : [];
      }
    },
    playerTwo: {
      type: WarriorType,
      resolve(parent, args) {
        return parent.players ? Warrior.findById(parent.players[1]) : [];
      }
    },
    winner: { type: GraphQLID },
    purse: { type: GraphQLInt },
    scheduled: { type: GraphQLBoolean },
    date: { type: GraphQLString }
  })
});

const ArmorType = new GraphQLObjectType({
  name: "Armor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    strength: { type: GraphQLInt },
    cost: { type: GraphQLInt },
    costType: { type: GraphQLString },
    weight: { type: GraphQLInt },
    image: { type: GraphQLString },
    shield: { type: GraphQLBoolean },
    size: {
      type: GraphQLString
    }
  })
});

const WeaponType = new GraphQLObjectType({
  name: "Weapon",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    damage: { type: GraphQLInt },
    cost: { type: GraphQLInt },
    costType: { type: GraphQLString },
    weight: { type: GraphQLInt },
    image: { type: GraphQLString },
    size: {
      type: GraphQLString
    }
  })
});

////////////////////////////////////////////////////////
////// CRUD Operations Start Here           ////////////
////////////////////////////////////////////////////////

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ///////////////////////////
    // Arena Read Methods... //
    ///////////////////////////

    // GET single Arena:
    arena: {
      type: ArenaType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Arena.findById(args.id);
      }
    },

    // Get ALL Arenas:
    arenas: {
      type: new GraphQLList(ArenaType),
      resolve(parent, args) {
        return Arena.find({});
      }
    },
    ///////////////////////////////
    // End Arena Read methods... //
    ///////////////////////////////

    ///////////////////////////
    // Market Read Methods... //
    ///////////////////////////

    // GET single Market:
    market: {
      type: MarketType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Arena.findById({ _id: args.id });
      }
    },

    // Get ALL Markets:
    markets: {
      type: new GraphQLList(MarketType),
      resolve(parent, args) {
        return Market.find({});
      }
    },
    ///////////////////////////////
    // End Market Read methods... //
    ///////////////////////////////

    ///////////////////////////
    // Warrior Read Methods... //
    ///////////////////////////

    // GET single Warrior:
    warrior: {
      type: WarriorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Warrior.findById({ _id: args.id });
      }
    },

    // Get ALL Warriors:
    warriors: {
      type: new GraphQLList(WarriorType),
      resolve(parent, args) {
        return Warrior.find({});
      }
    },
    ///////////////////////////////
    // End Warrior Read methods... //
    ///////////////////////////////

    ///////////////////////////
    // Battle Read Methods... //
    ///////////////////////////

    // GET single Battle:
    battle: {
      type: BattleType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Battle.findById(args.id);
      }
    },

    // Get ALL Battles:
    battles: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return Battle.find({});
      }
    },
    ///////////////////////////////
    // End Battle Read methods... //
    ///////////////////////////////

    ///////////////////////////
    // Armor Read Methods... //
    ///////////////////////////

    // GET single Armor:
    armor: {
      type: ArmorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Armor.findById(args.id);
      }
    },

    // Get ALL Armors:
    armors: {
      type: new GraphQLList(ArmorType),
      resolve(parent, args) {
        return Armor.find({});
      }
    },
    ///////////////////////////////
    // End Armor Read methods... //
    ///////////////////////////////

    ///////////////////////////
    // Weapon Read Methods... //
    ///////////////////////////

    // GET single Weapon:
    weapon: {
      type: WeaponType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Weapon.findById(args.id);
      }
    },

    // Get ALL Weapons:
    weapons: {
      type: new GraphQLList(WeaponType),
      resolve(parent, args) {
        return Weapon.find({});
      }
    }
    ///////////////////////////////
    // End Weapon Read methods... //
    ///////////////////////////////
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //////////////////////////////
    // Arena CUD Methods ////////
    /////////////////////////////

    addArena: {
      type: ArenaType,
      args: {
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        gamesFrequency: { type: GraphQLInt },
        battleQuantity: { type: GraphQLInt },
        warriorIds: { type: new GraphQLList(GraphQLID) },
        battleIds: { type: new GraphQLList(GraphQLID) },
        MarketId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let arena = new Arena({
          ...args
        });
        return arena.save();
      }
    },

    updateArena: {
      type: ArenaType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        gamesFrequency: { type: GraphQLInt },
        battleQuantity: { type: GraphQLInt },
        warriorIds: { type: new GraphQLList(GraphQLID) },
        battleIds: { type: new GraphQLList(GraphQLID) },
        MarketId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Arena.update(
          { _id: args.id },
          {
            ...args
          }
        );
      }
    },

    deleteArena: {
      type: ArenaType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Arena.findByIdAndRemove({ _id: args.id });
      }
    },

    //////////////////////////////
    // Market CUD Methods ////////
    /////////////////////////////

    addMarket: {
      type: MarketType,
      args: {
        name: { type: GraphQLString },
        weaponIds: { type: new GraphQLList(GraphQLID) },
        armorIds: { type: new GraphQLList(GraphQLID) },
        skillsUpgradeCost: { type: GraphQLInt },
        gearCostfactor: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        let market = new Market({
          ...args
        });
        return market.save();
      }
    },

    updateMarket: {
      type: MarketType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        weaponIds: { type: new GraphQLList(GraphQLID) },
        armorIds: { type: new GraphQLList(GraphQLID) },
        skillsUpgradeCost: { type: GraphQLInt },
        gearCostfactor: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        return Market.findOneAndUpdate(
          args.id,
          {
            ...args
          },
          { upsert: true }
        );
      }
    },

    deleteMarket: {
      type: MarketType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Market.findByIdAndRemove({ _id: args.id });
      }
    },

    //////////////////////////////
    // Battle CUD Methods ////////
    /////////////////////////////

    addBattle: {
      type: BattleType,
      args: {
        ArenaId: { type: GraphQLID },
        playerOneId: { type: GraphQLID },
        playerTwoId: { type: GraphQLID },
        purse: { type: GraphQLInt },
        scheduled: { type: GraphQLBoolean },
        date: { type: GraphQLString }
      },
      resolve(parent, args) {
        const justBattleData = {
          ArenaId: args.ArenaId,
          players: [playerOneId, playerTwoId],
          purse: args.purse,
          scheduled: args.scheduled,
          date: args.date
        };
        console.log(`justBattleData = `, justBattleData);
        let battle = new Battle({
          ...justBattleData
        });
        const arena = Arena.findById(args.ArenaId);
        const playerOne = Warrior.findById(args.players[0]);
        const playerTwo = Warrior.findById(args.players[1]);

        return battle.save().then(battle => {
          arena.battleIds.push(battle._id);
          playerOne.battlesIdList.push(battle._id);
          playerTwo.battlesIdList.push(battle._id);
          arena.save();
          playerOne.save();
          playerTwo.save();
        });
      }
    },

    updateBattle: {
      type: BattleType,
      args: {
        id: { type: GraphQLID },
        ArenaId: { type: GraphQLID },
        playerOne: { type: GraphQLID },
        playerTwo: { type: GraphQLID },
        winner: { type: GraphQLID },
        purse: { type: GraphQLInt },
        scheduled: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Battle.findOneAndUpdate(
          args.id,
          {
            ...args
          },
          { upsert: true }
        );
      }
    },

    deleteBattle: {
      type: BattleType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Battle.findByIdAndRemove({ _id: args.id });
      }
    },

    //////////////////////////////
    // Warrior CUD Methods ////////
    /////////////////////////////

    addWarrior: {
      type: WarriorType,
      args: {
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        male: { type: GraphQLBoolean },
        wallet: { type: GraphQLInt },
        strength: { type: GraphQLInt },
        speed: { type: GraphQLInt },
        stamina: { type: GraphQLInt },
        skill: { type: GraphQLInt },
        ArenaId: { type: GraphQLID },
        weaponsIdList: { type: new GraphQLList(GraphQLID) },

        armorIdList: { type: new GraphQLList(GraphQLID) },

        battlesIdList: { type: new GraphQLList(GraphQLID) },
        winnings: { type: GraphQLInt },
        alive: { type: GraphQLBoolean },
        show: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let obj = {};
        Arena.findOne({ name: "Carthago" }).then(result => {
          args.ArenaId = result._id;
          let warrior = new Warrior({
            ...args
          });
          obj = warrior.save();
          return obj.then(warrior => {
            result.warriorIds.push(warrior._id);
            result.save();
          });
        });
      }
    },

    updateWarrior: {
      type: WarriorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        male: { type: GraphQLBoolean },
        wallet: { type: GraphQLInt },
        strength: { type: GraphQLInt },
        speed: { type: GraphQLInt },
        stamina: { type: GraphQLInt },
        skill: { type: GraphQLInt },
        ArenaId: { type: GraphQLID },
        weaponsIdList: { type: new GraphQLList(GraphQLID) },

        armorIdList: { type: new GraphQLList(GraphQLID) },

        battlesIdList: { type: new GraphQLList(GraphQLID) },
        winnings: { type: GraphQLInt },
        alive: { type: GraphQLBoolean },
        show: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Warrior.updateOne(
          { _id: args.id },
          { ...args },
          { upsert: true }
        );
      }
    },

    deleteWarrior: {
      type: WarriorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let returnObj = {};
        Warrior.findById({ _id: args.id }, (error, warrior) => {
          if (error) console.log(error);

          if (warrior.battlesIdList.length > 0) {
            warrior.show = false;
            warrior.save();
            Arena.findById({ _id: warrior.ArenaId }, (error, arena) => {
              if (error) console.log(error);

              const list = arena.warriorIds.filter(item => {
                return item != warrior.id;
              });

              arena.warriorIds = list;
              arena.save();
              returnObj = warrior;
            });
          } else {
            returnObj = Warrior.findByIdAndDelete({ _id: args.id });
          }
        }).then(result => {
          return returnObj;
        });
      }
    },

    //////////////////////////////
    // Armor CUD Methods ////////
    /////////////////////////////

    addArmor: {
      type: ArmorType,
      args: {
        name: { type: GraphQLString },
        strength: { type: GraphQLInt },
        cost: { type: GraphQLInt },
        costType: { type: GraphQLString },
        weight: { type: GraphQLInt },
        image: { type: GraphQLString },
        shield: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let armor = new Armor({
          ...args
        });
        return armor.save();
      }
    },

    updateArmor: {
      type: ArmorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        strength: { type: GraphQLInt },
        cost: { type: GraphQLInt },
        costType: { type: GraphQLString },
        weight: { type: GraphQLInt },
        image: { type: GraphQLString },
        shield: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Armor.findOneAndUpdate(
          args.id,
          {
            ...args
          },
          { upsert: true }
        );
      }
    },

    deleteArmor: {
      type: ArmorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Armor.findByIdAndRemove({ _id: args.id });
      }
    },

    //////////////////////////////
    // Weapon CUD Methods ////////
    /////////////////////////////

    addWeapon: {
      type: WeaponType,
      args: {
        name: { type: GraphQLString },
        damage: { type: GraphQLInt },
        cost: { type: GraphQLInt },
        costType: { type: GraphQLString },
        weight: { type: GraphQLInt },
        image: { type: GraphQLString }
      },
      resolve(parent, args) {
        let weapon = new Weapon({
          ...args
        });
        return weapon.save();
      }
    },

    updateWeapon: {
      type: WeaponType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        damage: { type: GraphQLInt },
        cost: { type: GraphQLInt },
        costType: { type: GraphQLString },
        weight: { type: GraphQLInt },
        image: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Weapon.findOneAndUpdate(
          args.id,
          {
            ...args
          },
          { upsert: true }
        );
      }
    },

    deleteWeapon: {
      type: WeaponType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Weapon.findByIdAndRemove({ _id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
