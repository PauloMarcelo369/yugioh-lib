const database = require("../config/db.js");
const Sequelize = require("sequelize");
const User = require("./User.js");
const DeckCards = require("../models/DeckCards.js");

const Deck = database.define("decks", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  deck_description: {
    type: Sequelize.TEXT,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  is_public: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Deck;
