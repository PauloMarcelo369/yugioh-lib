const DeckCommentsService = require("../services/DeckCommentsService.js");

exports.addComment = async (req, res) => {
  const deckId = req.params.id;
  const user = req.user;
  const content = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: "usuário não autenticado!" });
    }
    const response = await DeckCommentsService.addComment(
      deckId,
      content,
      user
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const user = req.user;
  const content = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    const response = await DeckCommentsService.updateComment(
      commentId,
      content,
      user
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const user = req.user;

  try {
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado!" });
    }
    const response = await DeckCommentsService.deleteComment(commentId, user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDeckComments = async (req, res) => {
  const deckId = req.params.id;

  try {
    const comments = await DeckCommentsService.getDeckComments(deckId);
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
