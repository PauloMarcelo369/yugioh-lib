const database = require("../config/db.js");
const Sequelize = require("sequelize");
const Deck = require("./Deck.js");
const User = require("./User.js");

const DeckRating = database.define("deck_ratings", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

DeckRating.belongsTo(Deck, { foreignKey: "deck_id", onDelete: "CASCADE" });
DeckRating.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
module.exports = DeckRating;
