import { useRoutes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UserDecks } from "../pages/UserDecks";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "myDecks", element: <UserDecks /> },
];

export const AppRoutes = () => {
  const useRoute = useRoutes(routes);
  return useRoute;
};
