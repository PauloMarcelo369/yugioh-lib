const DeckService = require("../services/DeckService.js");

exports.createDeck = async (req, res) => {
  const deckObject = req.body;
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    const deck = await DeckService.createDeck({ ...deckObject, user });
    res.status(201).json(deck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDeck = async (req, res) => {
  const id_deck = req.params.id;
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    await DeckService.deleteDeck(id_deck, user);
    res.status(200).json({ message: "deck removido com sucesso!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateDeckInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    const updatedDeck = await DeckService.updateDeckInfo(id, user, req.body);
    res.status(200).json(updatedDeck);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllUserDecks = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    const decks = await DeckService.getAllUserDecks(user.id);
    res.status(200).json(decks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllPublicDecks = async (req, res) => {
  try {
    const decks = await DeckService.getAllPublicDecks();
    res.status(200).json(decks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
