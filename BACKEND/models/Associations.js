const Deck = require("./Deck.js");
const Card = require("./Card.js");
const DeckCards = require("./DeckCards.js");
const User = require("./User.js");

// Associações
Deck.belongsTo(User, {
  foreignKey: "id_user",
  constraints: true,
  onDelete: "CASCADE",
});
Deck.hasMany(DeckCards, {
  foreignKey: "deck_id",
  as: "deckCards",
  onDelete: "CASCADE",
});

DeckCards.belongsTo(Deck, {
  foreignKey: "deck_id",
  constraints: true,
  onDelete: "CASCADE",
});
DeckCards.belongsTo(Card, {
  foreignKey: "card_id",
  constraints: true,
  onDelete: "CASCADE",
});
