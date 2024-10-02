const router = require("express").Router();
const DeckController = require("../controllers/DeckController.js");
const DeckCardsController = require("../controllers/DeckCardController.js");
const DeckCommentsController = require("../controllers/DeckCommentsController.js");
const DeckRatingController = require("../controllers/DeckRatingsController.js");
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
router.get(
  "/deck/card/public_cards/:id",
  DeckCardsController.getPublicDeckCards
);
router.put(
  "/deck/card/:id",
  authorization,
  DeckCardsController.updateCardQuantity
);
router.delete(
  "/deck/card/:id",
  authorization,
  DeckCardsController.removeCardFromDeck
);
router.post("/deck/card", authorization, DeckCardsController.insertCardInDeck);

router.get("/deck/comments/:id", DeckCommentsController.getDeckComments);
router.post(
  "/deck/comments/:id",
  authorization,
  DeckCommentsController.addComment
);
router.put(
  "/deck/comments/:id",
  authorization,
  DeckCommentsController.updateComment
);
router.delete(
  "/deck/comments/:id",
  authorization,
  DeckCommentsController.deleteComment
);

router.post("/deck/:id/rating", authorization, DeckRatingController.addRating);

router.get("/deck/:id/rating", DeckRatingController.getDeckRatings);

router.put(
  "/deck/rating/:id",
  authorization,
  DeckRatingController.updateRating
);

router.delete(
  "/deck/rating/:id",
  authorization,
  DeckRatingController.deleteRating
);

module.exports = router;
