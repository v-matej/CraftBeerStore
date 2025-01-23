import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/TopBar.css";
import { AuthContext } from "../context/AuthContext";
import logo from "../styles/images/image.png";

const TopBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.user?.role === "admin";
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

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
          {isAdmin && <Link to="/admin">Control Panel</Link>}
          {isAdmin && <Link to="/admin/users/statistics">User Statistics</Link>}
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
