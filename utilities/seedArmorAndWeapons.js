const request = require("request");
const { Armor } = require("../Models/Armor");
const { Weapon } = require("../Models/Weapon");
const mongoose = require("mongoose");
const db = mongoose.connection;

const dnd = "http://www.dnd5eapi.co/api/equipment/";

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/road-to-rome-react";

mongoose.connect(MONGODB_URI);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log(`Connected succesfully to local mongo db.`);
  for (var i = 1; i < 51; i++) {
    request(`${dnd}${i}`, function(err, response, body) {
      const target = JSON.parse(body);

      if (target.equipment_category === "Weapon") {
        if (target.weapon_range === "Melee") {
          if (target.name !== "Lance") {
            const item = {
              name: target.name,
              damage: target.damage.dice_count * target.damage.dice_value,
              cost: target.cost.quantity,
              costType: target.cost.unit,
              weight: target.weight
            };
            //console.table(item);
            let weapon = new Weapon({ ...item });
            // console.log(weapon);
            weapon.save(function(err, result) {
              if (err) console.log(err);
              console.log(
                `${result.name} saved to the database with id = ${result._id}`
              );
            });
          }
        }
      } else if (target.equipment_category === "Armor") {
        const item = {
          name: target.name,
          strength: target.armor_class.base,
          cost: target.cost.quantity,
          costType: target.cost.unit,
          weight: target.weight,
          shield: target.name === "Shield" ? true : false
        };
        //console.table(item);
        let armor = new Armor({ ...item });
        //console.log(armor);
        armor.save(function(err, result) {
          if (err) console.log(err);
          console.log(
            `${result.name} saved to database with id = ${result._id}`
          );
        });
      }
    });
  }
});
