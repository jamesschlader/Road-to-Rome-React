const mongoose = require("mongoose");
const db = mongoose.connection;
const { Arena } = require("../Models/Arena");

const arenaData = [
  {
    name: "Carthago",
    image: "/img/arena-images/carthage.jpg",
    gamesFrequency: 2,
    battleQuantity: 6
  },
  {
    name: "Alexandria",
    image: "/img/arena-images/alexandria.jpg",
    gamesFrequency: 3,
    battleQuantity: 7
  },
  {
    name: "Ephesus",
    image: "/img/arena-images/ephesus.jpg",
    gamesFrequency: 3,
    battleQuantity: 8
  },
  {
    name: "Athens",
    image: "/img/arena-images/athens.jpg",
    gamesFrequency: 4,
    battleQuantity: 9
  },
  {
    name: "Corinth",
    image: "/img/arena-images/corinth.jpg",
    gamesFrequency: 4,
    battleQuantity: 10
  },
  {
    name: "Syracuse",
    image: "/img/arena-images/syracuse.jpg",
    gamesFrequency: 5,
    battleQuantity: 11
  },
  {
    name: "Neopolis",
    image: "/img/arena-images/neopolis.jpg",
    gamesFrequency: 5,
    battleQuantity: 12
  },
  {
    name: "Roma",
    image: "/img/arena-images/roma.jpg",
    gamesFrequency: 6,
    battleQuantity: 14
  }
];
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
