const CardService = require("../services/CardService.js");

exports.getAllCards = async (req, res) => {
  try {
    const cards = await CardService.getAllCards();
    console.log(cards);
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
