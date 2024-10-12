import styles from "./style.module.css";
import { useAuth } from "../../stores/userStore";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { isAxiosError } from "axios";
import { MiniCard } from "../../components/miniCard";

export const DeckFilter = ({
  deckId,
  handleClickCard,
  setAddCard,
  setRemovedCard,
}) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  const getCards = async () => {
    try {
      const response = await api.get("/cards");
      const cardsResponse = response.data;
      console.log(cardsResponse);
      setCards(cardsResponse);
    } catch (erro) {
      if (isAxiosError(error)) {
        setError(
          "houve um erro ao tentar resgatar as cartas: " +
            error.response.data.message
        );
      }
    }
  };

  const addCard = useEffect(() => {
    getCards();
  }, []);
  return (
    <div className={styles.container}>
      <header>
        <h2>filter cards!</h2>
      </header>
      <div className={styles.content}>
        <form action="">
          <InputGroup className="search-bar" style={{ maxWidth: "300px" }}>
            <InputGroup.Text
              style={{ backgroundColor: "#42494D", border: "none" }}
            >
              <FaSearch style={{ color: "white" }} />
            </InputGroup.Text>
            <FormControl
              placeholder="Busca por Texto"
              aria-label="Busca por Texto"
              style={{
                backgroundColor: "#42494D",
                border: "none",
                color: "white",
                paddingLeft: "10px",
              }}
            />
          </InputGroup>
          <button className="btn btn-success">search!</button>
        </form>
        <div className={styles.cardsContainer}>
          {cards
            .map((card) => {
              return (
                <div key={card.id} className={styles.cardContainer}>
                  <MiniCard
                    onClick={() => handleClickCard(card)}
                    img_url={card.img_url}
                    name={card.name}
                    cardId={card.id}
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => setAddCard(card)}
                    style={{
                      width: "100%",
                      fontSize: "5px",
                      padding: "5px 10px",
                      marginTop: "5px",
                    }}
                  >
                    Adicionar ao Deck
                  </button>
                  <br />
                  <button
                    className="btn btn-danger"
                    onClick={() => setRemovedCard(card)}
                    style={{
                      width: "100%",
                      fontSize: "5px",
                      padding: "5px 10px",
                      marginTop: "5px",
                    }}
                  >
                    remover do Deck
                  </button>
                </div>
              );
            })
            .slice(0, 40)}
        </div>
      </div>
    </div>
  );
};
