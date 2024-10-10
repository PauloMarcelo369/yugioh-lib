import { useAuth } from "../../stores/userStore";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DeckFilter } from "../../containers/DeckFilter";
import {  CardDetaily  } from "../../containers/CardDetaily";
import { DeckViewer } from "../../containers/DeckViewer";
import styles from "./styles.module.css";
import { api } from "../../api/api";
import { isAxiosError } from "axios";

export const Deck = () => {
  const { id } = useParams();
  const { jwt } = useAuth();
  const [deck, setDeck] = useState(null);
  const [addCard, setAddCard] = useState(null);
  const [removedCard, setRemovedCard] = useState(null);
  const [error, setError] = useState("");

  const getDeck = async () => {
    try {
      const response = await api.get(`/deck/get/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const responseDeck = response.data;
      console.log(responseDeck);
      setDeck(responseDeck);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          "Ocorreu um erro ao tentar pegar o deck: " +
            error.response.data.message
        );
      }
    }
  };

  useEffect(() => {
    getDeck();
  }, [id]);

  if (error) {
    return <Navigate to="/myDecks" replace />;
  }

  return (
    <div className={styles.deckContainer}>
      <div className={styles.detailyContainer}>
        <CardDetaily />
      </div>
      <div className={styles.viewerContainer}>
        <DeckViewer deckId={id} addCard={addCard} removedCard={removedCard} />
      </div>
      <div className={styles.filterContainer}>
        <DeckFilter setAddCard={setAddCard} setRemovedCard={setRemovedCard} />
      </div>
    </div>
  );
};
