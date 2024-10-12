const Card = require("../models/Card.js");

exports.getAllCards = async (page = 1, limit = 40) => {
  const offset = (page - 1) * limit;
  const cards = await Card.findAll({ limit: limit, offset: offset });
  return cards;
};

exports.getCardById = async (id) => {
  const card = await Card.findByPk(id);
  return card;
};
