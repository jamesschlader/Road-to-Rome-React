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
        return parent.battleIds.map(id =>
          Battle.find({}).filter(battle => battle.scheduled)
        );
      }
    },
    battleArchive: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battleIds.map(id =>
          Battle.findById({ _id: id }).filter(battle => !battle.scheduled)
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
        return Arena.findById({ _id: parent.ArenaId });
      }
    },

    armorIdList: {
      type: new GraphQLList(ArmorType)
    },

    weaponsIdList: { type: new GraphQLList(WeaponType) },

    battlesIdList: { type: new GraphQLList(GraphQLID) },

    battlesList: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battlesIdList.map(id => Battles.findById({ _id: id }));
      }
    },
    nextScheduledBattle: {
      type: new GraphQLList(BattleType),
      resolve(parent, args) {
        return parent.battlesIdList.map(id =>
          Battle.findById({ _id: id }).filter(battle => battle.scheduled)
        );
      }
    },
    winnings: { type: GraphQLInt },
    alive: { type: GraphQLBoolean }
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
    playerOne: { type: GraphQLID },
    playerTwo: { type: GraphQLID },
    winner: { type: GraphQLID },
    purse: { type: GraphQLInt },
    scheduled: { type: GraphQLBoolean }
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
        id: { type: GraphQLID },
        warriorId: { type: GraphQLID }
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
        return Arena.findById(args.id);
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
        playerOne: { type: GraphQLID },
        playerTwo: { type: GraphQLID },
        winner: { type: GraphQLID },
        purse: { type: GraphQLInt },
        scheduled: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let battle = new Battle({
          ...args
        });
        return battle.save();
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
        alive: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let warrior = new Warrior({
          ...args
        });
        return warrior.save();
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
        alive: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Warrior.where().update(
          { _id: args.id },
          { $set: { ...args } },
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
        return Warrior.findByIdAndRemove({ _id: args.id });
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
