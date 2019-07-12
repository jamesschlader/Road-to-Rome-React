const express = require("express");
const graphqlHTTP = require("express-graphql");
const Schema = require("./Schema/Schema.js");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const db = mongoose.connection;
var Jasmine = require("jasmine");
var jasmine = new Jasmine();

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/road-to-rome-react";

mongoose.connect(MONGODB_URI);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log(`Connected successfully to local mongo db.`);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Set up connection to GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);

jasmine.loadConfigFile("spec/support/jasmine.json");
jasmine.configureDefaultReporter({
  showColors: true
});

app.listen(PORT, () => {
  //jasmine.execute();
  console.log(`🌎 ==> A GraphQL Server is now running on port ${PORT}!`);
});
