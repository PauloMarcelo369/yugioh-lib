const AuthService = require("../services/AuthService.js");

exports.userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = { username, email, password };
    const responseObj = await AuthService.userRegister(user);
    res.status(201).json(responseObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const credentials = { email, password };
    const responseObj = await AuthService.userLogin(credentials);
    res.status(200).json(responseObj);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
