const Deck = require("../models/Deck.js");
const Card = require("../models/Card.js");

exports.createDeck = async (deckObject) => {
  const { name, deck_description, is_public, user } = deckObject;

  if (!user || !user.id) {
    throw new Error("Usuário não autenticado!");
  }
  try {
    const definitiveDeck = {
      name: name,
      deck_description: deck_description || "",
      is_public: is_public ?? 1,
      id_user: user.id,
    };
    const newDeck = await Deck.create(definitiveDeck);
    return newDeck;
  } catch (error) {
    throw new Error(`Erro ao criar o deck: ${error.message}`);
  }
};

exports.deleteDeck = async () => {};
