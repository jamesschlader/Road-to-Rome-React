require("dotenv").config();

console.log(
  ` process.env.DEVELOPMENT_DB_DSN = ${process.env.DEVELOPMENT_DB_DSN}`
);

const getDbUri = env => {
  console.log(`env = ${env}`);
  switch (env) {
    case "development":
      console.log(
        ` process.env.DEVELOPMENT_DB_DSN = ${process.env.DEVELOPMENT_DB_DSN}`
      );
      return (
        process.env.DEVELOPMENT_DB_DSN ||
        "mongodb://localhost:27017/road-to-rome-react"
      );
    case "production":
      return (
        process.env.PRODUCTION_DB_DSN ||
        "mongodb://localhost:27017/road-to-rome-react"
      );
    case "test":
      return (
        process.env.TEST_DB_DSN ||
        "mongodb://localhost:27017/road-to-rome-react"
      );
    default:
      return "mongodb://localhost:27017/road-to-rome-react";
  }
};

module.exports = getDbUri;
