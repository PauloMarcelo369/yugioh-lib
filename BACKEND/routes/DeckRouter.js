const router = require("express").Router();
const DeckController = require("../controllers/DeckController.js");
const DeckCardsController = require("../controllers/DeckCardController.js");
const authorization = require("../middlewares/Authenticate.js");

router.post("/deck", authorization, DeckController.createDeck);
router.get("/deck/public_decks", DeckController.getAllPublicDecks);
router.get("/deck/user_decks", authorization, DeckController.getAllUserDecks);
router.delete("/deck/user_decks/:id", authorization, DeckController.deleteDeck);
router.put(
  "/deck/user_decks/:id",
  authorization,
  DeckController.updateDeckInfo
);

router.get(
  "/deck/card/:id",
  authorization,
  DeckCardsController.getUserDeckCards
);
router.post("/deck/card", authorization, DeckCardsController.insertCardInDeck);

module.exports = router;
