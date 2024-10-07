import logo from "../../assets/images/logo-main.png";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import styles from "./styles.module.css";
import { useAuth } from "../../stores/userStore";
import { Link } from "react-router-dom";
import { SideBar } from "../Sidebar";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated);
  const [sideBar, setSidebar] = useState(false);

  const showSideBar = () => {
    setSidebar(!sideBar);
  };

  return (
    <header className={styles.header}>
      <FaBars onClick={showSideBar} />
      <img src={logo} alt="logo" />
      <div className="logout-login">
        {!isAuthenticated ? (
          <Link to="/login">login</Link>
        ) : (
          <span className="btn btn-primary cursor-pointer " onClick={logout}>
            logout
          </span>
        )}
        {sideBar && <SideBar active={setSidebar} />}
      </div>
    </header>
  );
};
