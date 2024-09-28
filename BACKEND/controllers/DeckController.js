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
