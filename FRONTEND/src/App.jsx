import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/Header/index.jsx";
import { AppRoutes } from "./routes/useRoutes.jsx";
import { AuthProvider } from "./stores/userStore.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main-container">
          <Header></Header>
          <div className="routes-content">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
