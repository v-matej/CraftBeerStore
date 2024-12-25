import React from "react";
import "../styles/TopBar.css";

const TopBar = () => {
  return (
    <header className="top-bar">
      <div className="site-name">Craft Beers</div>
      <nav className="navigation">
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
        <a href="/cart">Cart</a>
      </nav>
      <div className="login-bar">
        <a href="/login">Login</a>
      </div>
    </header>
  );
};

export default TopBar;
