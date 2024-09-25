const database = require("../config/db.js");
const Sequelize = require("sequelize");

const Card = database.define("cards", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(80),
    allowNull: false,
    unique: true,
  },
  type: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  frametype: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  atk: {
    type: Sequelize.INTEGER,
  },
  def: {
    type: Sequelize.INTEGER,
  },
  race: {
    type: Sequelize.STRING(50),
  },
  level: {
    type: Sequelize.INTEGER,
  },
  attribute: {
    type: Sequelize.STRING(50),
  },
  img_url: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
});

module.exports = Card;
