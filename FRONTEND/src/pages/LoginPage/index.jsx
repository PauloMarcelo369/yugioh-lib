import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useAuth } from "../../stores/userStore.jsx";
import { api } from "../../api/api.js";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import MilleniumPuzzle from "../../assets/images/MillenniumPuzzleIcon.png";
import { isAxiosError } from "axios";

export const LoginPage = () => {
  const { Authenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async () => {
    try {
      console.log(email, password);
      const content = await api.post("/login", { email, password });
      const jwt = content.data.token;

      const userInfo = (
        await api.get("/userInfo", {
          headers: { Authorization: `Bearer ${jwt}` },
        })
      ).data;
      console.log(userInfo);
      Authenticate(userInfo, jwt);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response.data.message);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    await loginUser();
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <form
          className="row d-flex justify-content-center align-items-center h-100"
          onSubmit={handleSubmit}
        >
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <div className="d-flex justify-content-center">
                    <img
                      src={MilleniumPuzzle}
                      className="img-fluid w-25"
                      alt="millenium puzzle"
                    />
                  </div>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      required
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                {error && <p>Houve um erro ao tentar logar: {error}</p>}

                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <Link to="/register" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
