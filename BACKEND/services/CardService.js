const Card = require("../models/Card.js");

exports.getAllCards = async () => {
  const cards = await Card.findAll();
  return cards;
};

exports.getCardById = async (id) => {
  const card = await Card.findByPk(id);
  return card;
};
