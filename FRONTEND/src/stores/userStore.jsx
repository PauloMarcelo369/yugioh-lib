import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  Children,
} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: localStorage.getItem("id") ? Number(localStorage.getItem("id")) : null,
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    role: localStorage.getItem("role") || "",
  });
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");

  const Authenticate = (newUser, token) => {
    setUser(newUser);
    setJwt(token);
    localStorage.setItem("id", String(newUser.id));
    localStorage.setItem("username", newUser.username);
    localStorage.setItem("email", newUser.email);
    localStorage.setItem("role", newUser.role);
  };

  const logout = () => {
    setUser({ id: null, username: "", email: "", role: "" });
    setJwt("");
    localStorage.clear();
  };

  const username = user.username;
  const role = user.role;
  const isAuthenticated = jwt !== "";

  const value = {
    user,
    jwt,
    username,
    role,
    isAuthenticated,
    Authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
