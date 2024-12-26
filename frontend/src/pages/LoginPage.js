import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/user/login", { email, password });
      const { token } = response.data;

      login(token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
