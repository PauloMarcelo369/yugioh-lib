const database = require("../config/db.js");
const Sequelize = require("sequelize");
const Deck = require("./Deck.js");
const Card = require("./Card.js");

const DeckCards = database.define("deck_cards", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = DeckCards;
