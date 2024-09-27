const CardService = require("../services/CardService.js");

exports.getAllCards = async (req, res) => {
  try {
    const cards = await CardService.getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getCardById = async (req, res) => {
  const cardId = req.params.id;
  try {
    const card = await CardService.getCardById(cardId);
    res.status(200).json(card);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
