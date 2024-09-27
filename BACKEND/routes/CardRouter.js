const express = require("express");
const router = express.Router();
const CardController = require("../controllers/CardController.js");

router.get("/cards", CardController.getAllCards);

module.exports = router;
