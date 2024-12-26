import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/user/register", { email, password, role: "user" });
      const { token } = response.data;

      login(token);
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
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
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
