import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/TopBar.css";
import { AuthContext } from "../context/AuthContext";
import logo from "../styles/images/logo.png";

const TopBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="top-bar">
      <div className="logo-container">
        <img src={logo} alt="Craft Beers Logo" className="logo" />
      </div>
      <div className="navigation-container">
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <div className="auth-bar">
          {isAuthenticated ? (
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
