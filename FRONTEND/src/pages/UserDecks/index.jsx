import { useAuth } from "../../stores/userStore";
import { api } from "../../api/api";
import { isAxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import styles from "./UserDecks.module.css";
import DeckCase from "../../assets/images/DeckCase.webp";
import { FaTimes, FaEdit } from "react-icons/fa";

export const UserDecks = () => {
  const { jwt, username } = useAuth();
  const [form, setForm] = useState("");
  const [error, setError] = useState("");
  const [decks, setDecks] = useState([]);

  const getDecks = async () => {
    try {
      const data = await api.get("/deck/user_decks", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const decks = data.data;
      setDecks(decks);
      console.log(decks);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          `ocorreu um erro ao tentar resgatar os decks: ${error.response.data.message}`
        );
      }
    }
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h2>{username} decks:</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className={styles.decksContainer}>
        {decks.map((deck) => {
          return (
            <div className={styles.deck}>
              <img src={DeckCase} alt="deckCase" />
              <div className={styles.deckInfo}>
                <p>deck name: {deck.name}</p>
                <p>description: {deck.deck_description}</p>
                <p>visualization: {deck.is_public ? "public" : "private"}</p>
              </div>
              <div className={styles.deckButtons}>
                <button
                  className="btn btn-success"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
