import { useAuth } from "../../stores/userStore";
import { api } from "../../api/api";
import { isAxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import styles from "./UserDecks.module.css";
import DeckCase from "../../assets/images/DeckCase.webp";
import { FaTimes, FaEdit } from "react-icons/fa";

export const UserDecks = () => {
  const { jwt, username } = useAuth();
  const [form, setForm] = useState(false);
  const [error, setError] = useState("");
  const [decks, setDecks] = useState([]);
  const [deckToEdit, setDeckToEdit] = useState(null);

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

  const addDeck = async (event) => {
    event.preventDefault();
    const form = document.getElementById("deckForm");
    const formData = new FormData(form);
    const dataObj = {};
    for (const [name, value] of formData.entries()) {
      if (name === "is_public") {
        dataObj[name] = value === "true";
      } else {
        dataObj[name] = value;
      }
    }
    try {
      const response = await api.post("/deck", dataObj, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const newDeck = response.data;
      setDecks([...decks, newDeck]);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          `ocorreu um erro ao tentar salvar o deck: ${error.response.data.message}`
        );
      }
    } finally {
      setForm(false);
    }
  };

  const updateDeckInfo = async (event) => {
    event.preventDefault();
    const form = document.getElementById("deckForm");
    const formData = new FormData(form);
    const dataObj = {};
    for (const [name, value] of formData.entries()) {
      dataObj[name] = name === "is_public" ? value === "true" : value;
    }
    try {
      const response = await api.put(
        `/deck/user_decks/${deckToEdit.id}`,
        dataObj,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      const updatedDeck = response.data;
      console.log(updatedDeck);
      const newList = decks.map((deck) =>
        deck.id === deckToEdit.id ? updatedDeck : deck
      );
      setDecks(newList);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          `ocorreu um erro ao tentar salvar o deck: ${error.response.data.message}`
        );
      }
    } finally {
      setForm(false);
      setDeckToEdit(null);
    }
  };

  const deleteDeck = async (id) => {
    try {
      await api.delete(`/deck/user_decks/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const newDeckList = decks.filter((obj) => obj.id !== id);
      setDecks(newDeckList);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          `ocorreu um erro ao tentar deletar o deck: ${error.response.data.message}`
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
      <button className="btn btn-success" onClick={() => setForm(true)}>
        New Deck!
      </button>
      {form && (
        <div className={styles.formContainer}>
          <form onSubmit={deckToEdit ? updateDeckInfo : addDeck} id="deckForm">
            <div>
              <FaTimes
                onClick={() => {
                  setForm(false);
                  setDeckToEdit(null);
                }}
                className="custom-icon fs-2 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="deckName">deck name:</label>
              <input
                type="text"
                id="deckName"
                name="name"
                required
                defaultValue={deckToEdit ? deckToEdit.name : ""}
              />
            </div>
            <div>
              <label htmlFor="description">deck description:</label>
              <textarea
                id="description"
                name="deck_description"
                rows="4"
                cols="50"
                defaultValue={deckToEdit ? deckToEdit.deck_description : ""}
              ></textarea>
            </div>
            <div>
              <label htmlFor="visualization">deck visualization:</label>
              <select
                id="visualization"
                name="is_public"
                defaultValue={deckToEdit ? deckToEdit.is_public : true}
              >
                <option value={true}>Public</option>
                <option value={false}>Private</option>
              </select>
            </div>
            <button className="btn btn-success">
              {" "}
              {deckToEdit ? "Update Deck" : "Submit!"}
            </button>
          </form>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}
      <div className={styles.decksContainer}>
        {decks.map((deck) => {
          return (
            <div className={styles.deck} key={deck.id}>
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
                  onClick={() => {
                    setDeckToEdit(deck);
                    setForm(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger"
                  style={{ border: "none", boxShadow: "none" }}
                  onClick={() => deleteDeck(deck.id)}
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
