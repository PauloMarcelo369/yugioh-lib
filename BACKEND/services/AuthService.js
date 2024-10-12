const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

exports.userRegister = async (user) => {
  const { username, email, password } = user;

  if (!username || !email || !password) {
    throw new Error("Todos os campos são obrigatórios!");
  }

  const userExists = await User.findOne({ where: { username } });
  const emailExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new Error("O nome de usuário já está em uso.");
  }
  if (emailExists) {
    throw new Error("O email já está cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    throw new Error("Erro ao criar o usuário. Tente novamente mais tarde.");
  }
};

exports.userLogin = async (credentials) => {
  const { email, password } = credentials;
  console.log(email);
  const user = await User.findOne({ where: { email } });
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
    token,
  };
};

exports.getLoggedUserInfo = async (user) => {
  const userInfo = await User.findByPk(user.id);
  if (!userInfo) {
    throw new Error("Usuário inexistente!");
  }

  const { id, username, email, role } = userInfo.toJSON();
  return { id, username, email, role };
};
