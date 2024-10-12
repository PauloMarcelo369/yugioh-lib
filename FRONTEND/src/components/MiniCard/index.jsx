import styles from "./style.module.css";

export const MiniCard = (props) => {
  return (
    <div onClick={props.onClick} className={styles.card} id={props.cardId}>
      <img src={props.img_url} alt={props.name} loading="lazy" />
    </div>
  );
};
