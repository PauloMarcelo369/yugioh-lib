import { useState } from "react";
import MilleniumPuzzle from "../../assets/images/MillenniumPuzzleIcon.png";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { AxiosError } from "axios";
import { isAxiosError } from "axios";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const registerUser = async () => {
    try {
      const user = await api.post("/register", { username, email, password });
      setSuccessMessage("Usuário cadastrado com sucesso!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (newError) {
      if (isAxiosError(newError)) {
        setError(
          "Ocorreu um erro ao tentar cadastrar o usuário: " +
            newError.response.data.message || "Erro desconhecido"
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    await registerUser();
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
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
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your details!
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="typeUsername"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="typeUsername">
                        Username
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    {error && <p className="text-danger">{error}</p>}
                    {successMessage && (
                      <p className="text-success">{successMessage}</p>
                    )}

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      href="#!"
                      className="text-white-50 fw-bold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
