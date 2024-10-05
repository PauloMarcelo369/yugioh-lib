const DeckRating = require("../models/DeckRating.js");
const Deck = require("../models/Deck.js");
const User = require("../models/User.js");
const { Sequelize } = require("sequelize");

exports.addRating = async (deck_id, content, user) => {
  const { id } = user;
  const { rating } = content;
  try {
    const appraiser = await User.findByPk(id);

    if (!appraiser) {
      throw new Error("você precisa estar logado para dar uma avaliação!");
    }

    const deck = await Deck.findOne({
      where: { id: deck_id, is_public: true },
    });

    if (!deck) {
      throw new Error(
        "Você não pode avaliar, pois o deck não existe ou não é público"
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error("A avaliação deve ser um valor entre 1 e 5.");
    }

    const newRating = await DeckRating.create({
      deck_id,
      user_id: id,
      rating,
    });

    return { deck_id, rating, createdAt: newRating.createdAt };
  } catch (error) {
    throw new Error(
      "ocorreu um erro ao tentar adicionar a avaliação: " + error.message
    );
  }
};

exports.getDeckRatings = async (deckid) => {
  try {
    const ratings = await DeckRating.findAll({
      where: { deck_id: deckid, rating: { [Sequelize.Op.not]: null } },
      attributes: ["id", "rating", "createdAt"],
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    if (!ratings.length) {
      return {
        totalRatings: 0,
        averageRating: 0,
        ratings: [],
      };
    }

    const ratingsQuantity = ratings.length;
    const mediaRatings =
      ratings.reduce((sum, { rating }) => sum + rating, 0) / ratingsQuantity;
    return {
      totalRatings: ratingsQuantity,
      averageRating: mediaRatings,
      ratings,
    };
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao tentar resgatar as avaliações: " + error.message
    );
  }
};

exports.updateRating = async (ratingId, content, user) => {
  const { id } = user;
  const { rating } = content;
  try {
    const ratingModel = await DeckRating.findByPk(ratingId);

    if (!ratingModel) {
      throw new Error("avaliação inexistente!");
    }

    if (ratingModel.user_id !== id) {
      throw new Error(
        "Usuário não tem autorização para atualizar a avaliação!"
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error("A avaliação deve ser um valor entre 1 e 5.");
    }

    await DeckRating.update({ rating }, { where: { id: ratingId } });
    return { message: "A avaliação foi atualizada com sucesso!", rating };
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao tentar atualizar a avaliação: " + error.message
    );
  }
};

exports.deleteRating = async (ratingId, user) => {
  const { id, role } = user;
  try {
    const rating = await DeckRating.findByPk(ratingId);

    if (!rating) {
      throw new Error("Avaliação inexistente!");
    }

    if (rating.user_id !== id && role !== "admin") {
      throw new Error("Usuário não tem autorização para apagar a avaliação!");
    }

    await DeckRating.destroy({ where: { id: ratingId } });

    return { message: "A avaliação foi apagada com sucesso!" };
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao tentar deletar a avaliação: " + error.message
    );
  }
};
