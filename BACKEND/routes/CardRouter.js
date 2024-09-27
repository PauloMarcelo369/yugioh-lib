const express = require("express");
const router = express.Router();
const CardController = require("../controllers/CardController.js");

router.get("/cards", CardController.getAllCards);
router.get("/cards/:id", CardController.getCardById);
module.exports = router;
