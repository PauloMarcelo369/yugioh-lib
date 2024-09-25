const Sequelize = require("sequelize");
const sequelize = new Sequelize("deckMaster", "postgres", "paulo123", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
