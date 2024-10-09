import { useRoutes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UserDecks } from "../pages/UserDecks";
import { Deck } from "../pages/Deck";
import ProtectedRoute from "./protectedRoute";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "myDecks",
    element: <ProtectedRoute element={<UserDecks />} />, // Protegendo
  },
  {
    path: "deck/:id",
    element: <ProtectedRoute element={<Deck />} />, // Protegendo a rota
  },
];

export const AppRoutes = () => {
  const useRoute = useRoutes(routes);
  return useRoute;
};
