const DeckRatingService = require("../services/DeckRatingService.js");

exports.addRating = async (req, res) => {
  const deckId = req.params.id;
  const user = req.user;
  const content = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    const response = await DeckRatingService.addRating(deckId, content, user);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getDeckRatings = async (req, res) => {
  const deckId = req.params.id;

  try {
    const ratings = await DeckRatingService.getDeckRatings(deckId);
    return res.status(200).json(ratings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateRating = async (req, res) => {
  const ratingId = req.params.ratingId;
  const user = req.user;
  const content = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }

    const response = await DeckRatingService.updateRating(
      ratingId,
      content,
      user
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteRating = async (req, res) => {
  const ratingId = req.params.ratingId;
  const user = req.user;

  try {
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }

    const response = await DeckRatingService.deleteRating(ratingId, user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
