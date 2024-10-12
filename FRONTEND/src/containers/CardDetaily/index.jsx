import styles from "./style.module.css";

export const CardDetaily = ({ currentCard }) => {
  return (
    <div className={styles.container}>
      <header>
        <h2>Card info</h2>
      </header>
      {currentCard && (
        <div className={styles.cardInformation}>
          <img src={currentCard.img_url} alt={currentCard.name} />
          <p>{currentCard.description}</p>
        </div>
      )}
    </div>
  );
};
