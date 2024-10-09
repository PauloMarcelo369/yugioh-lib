import { Navigate } from "react-router-dom";
import { useAuth } from "../stores/userStore";

const ProtectedRoute = ({ element }) => {
  const { jwt } = useAuth();

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
