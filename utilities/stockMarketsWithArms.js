const request = require("request");
const { Armor } = require("../Models/Armor");
const { Weapon } = require("../Models/Weapon");
const { Arena } = require("../Models/Arena");
const { Market } = require("../Models/Market");
const mongoose = require("mongoose");
const db = mongoose.connection;

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/road-to-rome-react";

mongoose.connect(MONGODB_URI);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log(`Connected succesfully to local mongo db.`);
  Weapon.find({}, (err, weapons) => {
    const mediumWeapons = weapons.filter(weapon => {
      return weapon.cost * 100 < 1000 ? weapon : null;
    });
    const bigWeapons = weapons.filter(weapon => {
      return weapon.cost * 100 < 1500 ? weapon : null;
    });
    const biggerWeapons = weapons.filter(weapon => {
      return weapon.cost * 100 < 3000 ? weapon : null;
    });

    Armor.find({}, (err, armors) => {
      const mediumArmors = armors.filter(armor => {
        return armor.cost < 75 ? armor : null;
      });
      const bigArmors = armors.filter(armor => {
        return armor.cost < 400 ? armor : null;
      });
      const largerArmors = armors.filter(armor => {
        return armor.cost < 751 ? armor : null;
      });

      Arena.find({}, (err, arenas) => {
        const armedMarkets = arenas.map(arena => {
          const value = arena.gamesFrequency * arena.battleQuantity;
          console.log(
            `Arena: ${arena.name} Value = ${value} MarketId: ${arena.MarketId}`
          );
          if (value < 24) {
            Market.update(
              { _id: arena.MarketId },
              {
                armorIds: mediumArmors,
                weaponIds: mediumWeapons
              },
              (err, result) => {
                if (err)
                  console.log(
                    `Failure to update ${
                      arena.MarketId
                    } with armors and weapons.`
                  );
                console.log(`Updated ${arena.name} with armor and weapons.`);
              }
            );
          }
          if (value > 23 && value < 40) {
            Market.update(
              { _id: arena.MarketId },
              {
                armorIds: bigArmors,
                weaponIds: bigWeapons
              },
              (err, result) => {
                if (err)
                  console.log(
                    `Failure to update ${
                      arena.MarketId
                    } with armors and weapons.`
                  );
                console.log(`Updated ${arena.name} with armor and weapons.`);
              }
            );
          }
          if (value > 39 && value < 60) {
            Market.update(
              { _id: arena.MarketId },
              {
                armorIds: largerArmors,
                weaponIds: biggerWeapons
              },
              (err, result) => {
                if (err)
                  console.log(
                    `Failure to update ${
                      arena.MarketId
                    } with armors and weapons.`
                  );
                console.log(`Updated ${arena.name} with armor and weapons.`);
              }
            );
          }
          if (value > 59) {
            Market.update(
              { _id: arena.MarketId },
              {
                armorIds: armors,
                weaponIds: weapons
              },
              (err, result) => {
                if (err)
                  console.log(
                    `Failure to update ${
                      arena.MarketId
                    } with armors and weapons.`
                  );
                console.log(`Updated ${arena.name} with armor and weapons.`);
              }
            );
          }
        });
      });
    });
  });
});
