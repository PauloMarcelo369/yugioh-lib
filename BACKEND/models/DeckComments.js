const database = require("../config/db.js");
const Sequelize = require("sequelize");
const Deck = require("./Deck.js");
const User = require("./User.js");

const DeckComments = database.define("deck_comments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

DeckComments.belongsTo(Deck, { foreignKey: "deck_id", onDelete: "CASCADE" });
DeckComments.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
module.exports = DeckComments;
