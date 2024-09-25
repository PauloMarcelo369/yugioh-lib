const sequelize = require("./config/db.js");
const User = require("./models/User.js");

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    // Sincronizando os modelos com o banco de dados
    await sequelize.sync();
    console.log("Modelos sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  }
};

start();
