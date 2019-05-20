const mongoose = require("mongoose");
const db = mongoose.connection;
const { Arena } = require("../Models/Arena");
const arenaData = require("../StaticData/arenaData");

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/road-to-rome-react";

mongoose.connect(MONGODB_URI);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log(`Connected succesfully to local mongo db.`);
  arenaData.forEach(item => {
    let arena = new Arena({ ...item });
    arena.save((err, result) => {
      if (err) console.log(err);
      console.log(
        `${result.name} saved to the database with id = ${result._id}`
      );
    });
  });
});
