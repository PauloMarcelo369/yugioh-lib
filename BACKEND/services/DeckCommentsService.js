const Deck = require("../models/Deck.js");
const User = require("../models/User.js");
const DeckComments = require("../models/DeckComments.js");

exports.addComment = async (deck_id, content, user) => {
  const { id } = user;
  const { comment } = content;
  try {
    const commentor = await User.findByPk(id);

    if (!commentor) {
      throw new Error("você precisa estar logado para comentar");
    }

    const deck = await Deck.findOne({
      where: { id: deck_id, is_public: true },
    });

    if (!deck) {
      throw new Error(
        "Você não pode comentar, pois o deck não existe ou não é público"
      );
    }

    if (!comment || comment.trim() === "") {
      throw new Error("O comentário não pode estar vazio");
    }

    const newComment = await DeckComments.create({
      deck_id,
      user_id: id,
      comment,
    });

    return { deck_id, comment, createdAt: newComment.createdAt };
  } catch (error) {
    throw new Error(
      "ocorreu um erro ao tentar adicionar o comentário: " + error.message
    );
  }
};

exports.getDeckComments = async (deckid) => {
  try {
    const comments = await DeckComments.findAll({
      where: { deck_id: deckid },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!comments) {
      throw new Error("Deck inexiste!");
    }
    return comments;
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao tentar resgatar os comentários: " + error.message
    );
  }
};

exports.updateComment = async (commentId, content, user) => {
  const { id } = user;
  const { comment } = content;
  try {
    const commentModel = await DeckComments.findByPk(commentId);

    if (!commentModel) {
      throw new Error("Comentário inexistente!");
    }

    if (commentModel.user_id !== id) {
      throw new Error(
        "Usuário não tem autorização para atualizar o comentário!"
      );
    }

    if (!comment || comment.trim() === "") {
      throw new Error("O comentário não pode estar vazio");
    }

    await DeckComments.update({ comment }, { where: { id: commentId } });
    return { message: "O comentário foi atualizado com sucesso!" };
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao tentar atualizar o comentário: " + error.message
    );
  }
};

exports.deleteComment = async (commentId, user) => {
  const { id, role } = user;
  try {
    const comment = await DeckComments.findByPk(commentId);
    if (!comment) {
      throw new Error("Comentário inexistente!");
    }

    if (comment.user_id !== id && role !== "admin") {
      throw new Error("Usuário não tem autorização para apagar o comentário!");
    }

    await DeckComments.destroy({ where: { id: commentId } });
    return { message: "O comentário foi apagado com sucesso!" };
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao tentar deletar o comentário: " + error.message
    );
  }
};
