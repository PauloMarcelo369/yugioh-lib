const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userRegister = async (user) => {
  const { username, email, password } = user;
  const userExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  if (userExists || emailExists) {
    throw new Error("Alguns campos já estão cadastrados no banco de dados!");
  }
  const HashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password_hash: HashedPassword,
  });
  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
  };
};

exports.userLogin = async (credentials) => {
  const { email, password } = credentials;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario inexistente!");
  }

  const passwordIsValid = bcrypt.compare(password, user.password_hash);
  if (!passwordIsValid) {
    throw new Error("Senha incorreta!");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    username: user.username,
    email: user.email,
    role: user.role,
    token,
  };
};
