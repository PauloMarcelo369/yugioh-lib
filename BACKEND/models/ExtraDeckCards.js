const database = require("../config/db.js");
const Sequelize = require("sequelize");
const Deck = require("./Deck.js");
const Card = require("./Card.js");

const extraDeckCards = database.define("extra_deck_cards", {
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

extraDeckCards.belongsTo(Deck, {
  foreignKey: "deck_id",
  constraints: true,
  onDelete: "CASCADE",
});
extraDeckCards.belongsTo(Card, {
  foreignKey: "card_id",
  constraints: true,
  onDelete: "CASCADE",
});

module.exports = extraDeckCards;
