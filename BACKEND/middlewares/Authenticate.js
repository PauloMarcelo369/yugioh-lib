const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status("401").json({ message: "erro: token inválido!" });
  }

  const bearerToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  jwt.verify(bearerToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(403).json({
        message: "erro: você não tem permissão para acessar essa rota!",
      });
    } else {
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
      req.next();
    }
  });
};
