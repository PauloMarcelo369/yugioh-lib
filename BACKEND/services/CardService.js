const Card = require("../models/Card.js");

exports.getAllCards = async () => {
  const cards = await Card.findAll();
  return cards;
};
