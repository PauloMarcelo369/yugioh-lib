const Deck = require("../models/Deck.js");
const Card = require("../models/Card.js");
const { where } = require("sequelize");

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
    return {
      id: newDeck.id,
      name: newDeck.name,
      deck_description: newDeck.deck_description,
      is_public: newDeck.is_public,
      cretedAt: newDeck.createdAt,
      updatedAt: newDeck.updatedAt,
    };
  } catch (error) {
    throw new Error(`Erro ao criar o deck: ${error.message}`);
  }
};

exports.deleteDeck = async (deck_id, userInfo) => {
  const { id, role } = userInfo;
  try {
    const deck = await Deck.findByPk(deck_id);

    if (!deck) {
      throw new Error("Deck inexistente!");
    }

    if (deck.id_user !== id && role !== "admin") {
      throw new Error("Você não tem permissão para apagar esse deck!");
    }
    await Deck.destroy({ where: { id: deck_id } });
  } catch (error) {
    throw new Error(`erro ao tentar deletar deck: ${error.message}`);
  }
};

exports.updateDeckInfo = async (deck_id, user_info, updatedDeckInfo) => {
  const { id, role } = user_info;
  try {
    const deck = await Deck.findByPk(deck_id);

    if (!deck) {
      throw new Error("Deck inexistente!");
    }

    if (deck.id_user !== id && role !== "admin") {
      throw new Error("Você não tem permissão para editar esse deck!");
    }
    delete updatedDeckInfo.user_id;

    await Deck.update(updatedDeckInfo, { where: { id: deck_id } });
  } catch (error) {
    throw new Error(
      `erro ao tentar atualizar os dados do deck: ${error.message}`
    );
  }
};
