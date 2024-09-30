const Card = require("../models/Card.js");
const DeckCards = require("../models/DeckCards.js");
const User = require("../models/User.js");
const Deck = require("../models/Deck.js");

const MAX_TOTAL_CARDS = 60;

exports.addCardToDeck = async (deckId, cardId, user, quantity) => {
  const { id, role } = user;
  try {
    const deck = await Deck.findByPk(deckId);
    const card = await Deck.findByPk(cardId);

    if (!deck || !card) {
      throw new Error("O deck ou o card não existe");
    }

    if (deck.user_id !== id) {
      throw new Error(
        "O usuário não tem permissão de adicionar o card no deck!"
      );
    }
    const totalCards = await DeckCards.sum("quantity", {
      where: { deck_id: deckId },
    });

    if (quantity + totalCards > MAX_TOTAL_CARDS) {
      throw new Error(
        `A quantidade de cards excede o limite do deck: max=${MAX_TOTAL_CARDS}`
      );
    }

    if (
      [
        "Synchro Monster",
        "XYZ Monster",
        "Link Monster",
        "Fusion Monster",
      ].includes(card.type)
    ) {
      throw new Error(`O tipo da carta não é válido para o deck!`);
    }
    const newCardDeck = await DeckCards.create({
      id_deck: deckId,
      id_card: cardId,
      quantity,
    });

    return newCardDeck;
  } catch (error) {
    throw new Error(
      `Ocorreu um erro ao tentar adicionar o deck: ${error.message}`
    );
  }
};
