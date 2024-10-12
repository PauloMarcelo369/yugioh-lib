import styles from "./style.module.css";
import { useAuth } from "../../stores/userStore";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useRef } from "react";
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 40;
  const observer = useRef(null);
  const lastCard = useRef(null);

  const getCards = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await api.get(`/cards?page=${page}&limit=${limit}`);
      const cardsResponse = response.data;
      console.log(cardsResponse);
      setCards((prevCards) => [...prevCards, ...cardsResponse]);
      setLoading(false);
    } catch (erro) {
      if (isAxiosError(error)) {
        setError(
          "houve um erro ao tentar resgatar as cartas: " +
            error.response.data.message
        );
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addCard = useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastElement = entries[entries.length - 1];
      if (lastElement.isIntersecting) {
        getCards();
        setPage((lastPage) => lastPage + 1);
      }
    });
    if (lastCard.current) {
      observer.current.observe(lastCard.current);
    }
    return () => {
      if (lastCard.current && observer.current) {
        observer.current.unobserve(lastCard.current);
      }
    };
  }, [page]);

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
          {loading && <p>Carregando mais cartas...</p>}
          {cards.map((card) => {
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
          })}
          <div ref={lastCard} style={{ color: "white" }}>
            carregando o restante...
          </div>
        </div>
      </div>
    </div>
  );
};
