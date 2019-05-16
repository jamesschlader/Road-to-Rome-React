const mongoose = require("mongoose");
const db = mongoose.connection;
const { Market } = require("../Models/Market");
const { Arena } = require("../Models/Arena");

const marketData = [
  { name: "Carthago", skillsUpgradeCost: 300, gearCostFactor: 2.0 },
  { name: "Alexandria", skillsUpgradeCost: 280, gearCostFactor: 1.8 },
  { name: "Ephesus", skillsUpgradeCost: 260, gearCostFactor: 1.6 },
  { name: "Athens", skillsUpgradeCost: 240, gearCostFactor: 1.4 },
  { name: "Corinth", skillsUpgradeCost: 220, gearCostFactor: 1.2 },
  { name: "Syracuse", skillsUpgradeCost: 200, gearCostFactor: 1.1 },
  { name: "Neopolis", skillsUpgradeCost: 190, gearCostFactor: 1.0 },
  { name: "Roma", skillsUpgradeCost: 180, gearCostFactor: 0.9 }
];

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/road-to-rome-react";

mongoose.connect(MONGODB_URI);

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log(`Connected successfully to local mongo db.`);
  marketData.forEach(market => {
    Market.find({ name: market.name }, (err, response) => {
      if (err) console.log(err);
      console.log(`${response[0].name} Market _id = ${response[0]._id}`);
      Arena.updateOne(
        { name: response[0].name },
        { MarketId: response[0]._id },
        (err, results) => {
          if (err) console.log(err);
        }
      );
    });
  });
});
