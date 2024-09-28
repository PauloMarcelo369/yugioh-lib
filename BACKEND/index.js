const express = require("express");
const sequelize = require("./config/db.js");
const axios = require("axios");
const User = require("./models/User.js");
const Card = require("./models/Card.js");
const Deck = require("./models/Deck.js");
const DeckCards = require("./models/DeckCards.js");
const DeckRating = require("./models/DeckRating.js");
const DeckComments = require("./models/DeckComments.js");
require("dotenv").config();

const CardRouter = require("./routes/CardRouter.js");
const AuthRouter = require("./routes/AuthRouter.js");
const DeckRouter = require("./routes/DeckRouter.js");

const app = express();

app.use(express.json());

app.use("/", CardRouter, AuthRouter, DeckRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    await sequelize.sync();
    console.log("Modelos sincronizados com sucesso.");
    const CardCount = await Card.count();
    console.log(CardCount);

    if (!CardCount) {
      async function populate_cards() {
        try {
          const data = await axios.get(
            "https://db.ygoprodeck.com/api/v7/cardinfo.php"
          );

          const cardPromises = data.data.data.map((apiCard) => {
            const cardObject = {
              name: apiCard.name,
              type: apiCard.type,
              frametype: apiCard.frameType,
              description: apiCard.desc,
              atk: apiCard.atk != undefined ? apiCard.atk : null,
              def: apiCard.def != undefined ? apiCard.def : null,
              race: apiCard.race != undefined ? apiCard.race : null,
              level: apiCard.level != undefined ? apiCard.level : null,
              attribute:
                apiCard.attribute != undefined ? apiCard.attribute : null,
              img_url: apiCard.card_images[0].image_uSrl,
            };
            return Card.create(cardObject);
          });
          await Promise.all(cardPromises);
          console.log("Cartas populadas com sucesso!");
        } catch (error) {
          console.log(`ocorreu um erro na requisiçõa: ${error}`);
        }
      }
      populate_cards();
    }
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  }
};

start();

app.listen(process.env.PORT, () => {
  console.log(`servidor rodando na porta: ${process.env.PORT}`);
});
