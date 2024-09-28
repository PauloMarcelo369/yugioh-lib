const Deck = require("../models/Deck.js");

exports.createDeck = async (deckObject) => {
  const { name, deck_description, is_public, userId } = deckObject;
  const definitiveDeck = {
    name: name,
    deck_description: deck_description || "",
    is_public: deck_description ?? 1,
    id_user: userId,
  };
  Deck.create(definitiveDeck);
};

exports.deleteDeck = async () => {};
