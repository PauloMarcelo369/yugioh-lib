import { FaTimes } from "react-icons/fa";
import styles from "./SideBar.module.css";

export const SideBar = ({ active }) => {
  const closeSideBar = () => {
    active(false);
  };

  return (
    <div
      className={`${styles.container} ${active ? styles.containerOpen : ""}`}
    >
      <FaTimes onClick={closeSideBar} />
    </div>
  );
};
