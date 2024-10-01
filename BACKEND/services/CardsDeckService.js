const Card = require("../models/Card.js");
const DeckCards = require("../models/DeckCards.js");
const User = require("../models/User.js");
const Deck = require("../models/Deck.js");

const MAX_TOTAL_CARDS = 60;
const MAX_CARD_QUANTITY = 3;

exports.addCardToDeck = async (deckId, cardId, user, quantity = 1) => {
  const { id, role } = user;
  try {
    const deck = await Deck.findByPk(deckId);
    const card = await Card.findByPk(cardId);

    if (!deck || !card) {
      throw new Error("O deck ou o card não existe");
    }

    if (deck.id_user !== id) {
      console.log(deck.id_user, id);
      throw new Error(
        "O usuário não tem permissão de adicionar o card no deck!"
      );
    }

    if (quantity > MAX_CARD_QUANTITY) {
      throw new Error(
        "A quantidade de cards informado excede o limite permitido: " +
          "limite = " +
          MAX_CARD_QUANTITY
      );
    }

    const cardExists = await DeckCards.findOne({
      where: { deck_id: deck.id, card_id: card.id },
    });

    if (cardExists) {
      throw new Error("O card já existe!");
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
      deck_id: deckId,
      card_id: cardId,
      quantity,
    });

    return newCardDeck.toJSON();
  } catch (error) {
    throw new Error(
      `Ocorreu um erro ao tentar adicionar o deck: ${error.message}`
    );
  }
};

exports.removeCardFromDeck = async (cardId, user) => {
  const { id, role } = user;
  try {
    const cardDeck = await DeckCards.findByPk(cardId);
    if (!cardDeck) {
      throw new Error("card não existe!");
    }
    const deck = await Deck.findByPk(cardDeck.deck_id);

    if (deck.id_user !== id) {
      throw new Error("O usuário não tem permissão de remover o card no deck!");
    }
    await DeckCards.destroy({ where: { id: cardId } });
    return { message: "Card removido com sucesso!" };
  } catch (error) {
    throw new Error(
      `Ocorreu um erro ao tentar remover no deck: ${error.message}`
    );
  }
};

exports.updateCardQuantity = async (cardId, user, quantity) => {
  const { id, role } = user;
  try {
    const cardDeck = await DeckCards.findByPk(cardId);
    if (!cardDeck) {
      throw new Error("card não existe!");
    }
    const deck = await Deck.findByPk(cardDeck.deck_id);

    if (deck.id_user !== id) {
      throw new Error(
        "O usuário não tem permissão de atualizar o card no deck!"
      );
    }

    if (quantity > MAX_CARD_QUANTITY) {
      throw new Error(
        `a quantidade informada excede o que máximo permitido: max=${MAX_CARD_QUANTITY}`
      );
    }
    await DeckCards.update({ quantity }, { where: { id: cardId } });
    return { quantity };
  } catch (error) {
    throw new Error(
      `Ocorreu um erro ao tentar atualizar a carta no deck: ${error.message}`
    );
  }
};

exports.getPublicDeckCards = async (deck_id) => {
  try {
    const deck = await Deck.findOne({
      where: { is_public: true, id: deck_id },
      include: {
        model: DeckCards,
        as: "deckCards",
        include: [{ model: Card }],
      },
    });

    if (!deck) {
      throw new Error("deck inexistente ou não é público");
    }
    return deck.deckCards;
  } catch (error) {
    throw new Error(
      `ocorreu um erro ao tentar resgatar os cards do deck: ${error.message}`
    );
  }
};

exports.getUserDeckCards = async (deck_id, user) => {
  const { id, role } = user;
  try {
    const deck = await Deck.findOne({
      where: { id: deck_id, id_user: id },
      include: {
        model: DeckCards,
        as: "deckCards",
        include: [{ model: Card }],
      },
    });

    if (!deck) {
      throw new Error("O deck não diz respeito ao usuário ou não existe!");
    }

    return deck.deckCards;
  } catch (error) {
    throw new Error(
      `ocorreu um erro ao tentar resgatar as cards: ${error.message}`
    );
  }
};
