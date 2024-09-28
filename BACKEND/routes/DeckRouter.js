const router = require("express").Router();
const DeckController = require("../controllers/DeckController.js");
const authorization = require("../middlewares/Authenticate.js");

router.post("/deck", authorization, DeckController.createDeck);

module.exports = router;
