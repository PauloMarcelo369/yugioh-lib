const DeckCardService = require("../services/CardsDeckService.js");

exports.insertCardInDeck = async (req, res) => {
  const { deck_id, card_id } = req.body;
  try {
    console.log(deck_id, card_id);
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "usuário não existe!" });
    }
    const deck = await DeckCardService.addCardToDeck(deck_id, card_id, user);
    res.status(202).json(deck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserDeckCards = async (req, res) => {
  const deckId = req.params.id;
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "usuário não existe!" });
    }
    const deck = await DeckCardService.getUserDeckCards(deckId, user);
    res.status(200).json(deck);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
