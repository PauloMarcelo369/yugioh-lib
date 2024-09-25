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
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

DeckComments.belongsTo(Deck, { foreignKey: "deck_id" });
DeckComments.belongsTo(User, { foreignKey: "user_id" });
module.exports = DeckComments;
