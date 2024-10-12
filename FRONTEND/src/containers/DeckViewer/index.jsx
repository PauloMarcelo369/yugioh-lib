import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { api } from "../../api/api";
import { isAxiosError } from "axios";
import { MiniCard } from "../../components/miniCard";
import { useAuth } from "../../stores/userStore";

export const DeckViewer = (props) => {
  const { jwt } = useAuth();
  const { deckId, removedCard, addCard, handleClickCard } = props;
  const [cardsToDeck, setCardsToDeck] = useState([]);
  const [error, setError] = useState("");

  const getAllDeckCards = async () => {
    try {
      const response = await api.get(`/deck/card/${deckId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const cards = response.data;
      console.log(cards);

      setCardsToDeck(cards);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          "Ocorreu um erro ao tentar resgatar as cards do deck: " +
            error.response.data.message
        );
      }
    }
  };

  const createCardDeck = async () => {
    try {
      const sendObj = { deck_id: deckId, card_id: addCard.id };
      const response = await api.post("/deck/card", sendObj, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const card = response.data;
      setCardsToDeck([...cardsToDeck, card]);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(
          `erro ao tentar adicionar nova card ao deck: ${error.response.data.message}`
        );
      }
    }
  };

  const updateCardQuantity = async ({ id, quantity }) => {
    try {
      const sendObj = { quantity };
      const response = await api.put(`/deck/card/${id}`, sendObj, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = response.data;
      const newDeckList = cardsToDeck.map((card) => {
        return card.id === id ? { ...card, quantity } : card;
      });
      setCardsToDeck(newDeckList);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(
          `ocorreu um erro ao tentar atualizar a quantidade de cartas no deck`
        );
      }
    }
  };

  useEffect(() => {
    if (addCard) {
      let currentUpdatedCard = null;
      for (let i = 0; i < cardsToDeck.length; i++) {
        const cardId = cardsToDeck[i].card.id;
        if (cardId === addCard.id) {
          currentUpdatedCard = cardsToDeck[i];
          break;
        }
      }
      if (!currentUpdatedCard) {
        createCardDeck();
      } else {
        updateCardQuantity({
          id: currentUpdatedCard.id,
          quantity: currentUpdatedCard.quantity + 1,
        });
      }
    }
  }, [addCard]);

  const deleteCard = async ({ id }) => {
    try {
      const response = await api.delete(`/deck/card/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const newCardList = cardsToDeck.filter((card) => card.id !== id);
      setCardsToDeck(newCardList);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(
          `ocorreu um erro eo tentar deletar o deck: ${error.response.data.message}`
        );
      }
    }
  };

  useEffect(() => {
    if (removedCard) {
      let currentRemovedCard = null;
      for (let i = 0; i < cardsToDeck.length; i++) {
        const cardId = cardsToDeck[i].card.id;
        if (cardId === removedCard.id) {
          currentRemovedCard = cardsToDeck[i];
          break;
        }
      }
      if (currentRemovedCard) {
        if (currentRemovedCard.quantity === 1) {
          deleteCard(currentRemovedCard);
        } else {
          updateCardQuantity({
            id: currentRemovedCard.id,
            quantity: currentRemovedCard.quantity - 1,
          });
        }
      } else {
        console.log("card inexistente!");
      }
    }
  }, [removedCard]);

  useEffect(() => {
    getAllDeckCards();
  }, []);

  if (error) {
    console.log(error);
  }

  return (
    <div className={styles.container}>
      <header>
        <h2>deck cards</h2>
      </header>
      <div className={styles.deckContainer}>
        {cardsToDeck
          .flatMap((cardDeck) => {
            const { card, quantity } = cardDeck;

            return Array(quantity).fill(card);
          })
          .map((card, index) => (
            <MiniCard
              key={`${card.id}-${index}`}
              onClick={() => handleClickCard(card)}
              img_url={card.img_url}
              name={card.name}
              cardId={card.id}
            />
          ))
          .slice(0, 40)}
      </div>
      <div className={styles.extraDeckContainer}></div>
    </div>
  );
};
