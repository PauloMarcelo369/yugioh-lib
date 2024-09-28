const database = require("../config/db.js");
const Sequelize = require("sequelize");

const User = database.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("user", "admin"),
    defaultValue: "user",
  },
});

module.exports = User;
