import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteService from "../services/FavoriteService"; // Import FavoriteService
import "../styles/FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoritesError, setFavoritesError] = useState(null);

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteList = await FavoriteService.getFavorites();
        setFavorites(favoriteList);
      } catch (err) {
        setFavoritesError("Failed to fetch favorites.");
      } finally {
        setFavoritesLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Handle removing a product from favorites
  const handleRemoveFromFavorites = async (productId) => {
    try {
      await FavoriteService.removeFavorite(productId); // Call the service to remove from favorites
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.product._id !== productId)
      );
    } catch (err) {
      console.error("Error removing from favorites", err);
    }
  };

  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      <main className="content">
        <div className="messages">
          {favoritesLoading && <p>Loading favorites...</p>}
          {favoritesError && <p className="error">{favoritesError}</p>}
          {!favoritesLoading && !favoritesError && favorites.length === 0 && (
            <p className="no-favorite">You have no favorites yet.</p>
          )}
        </div>
        <div className="product-list">
          {!favoritesLoading &&
            !favoritesError &&
            favorites.length > 0 &&
            favorites.map((fav) => (
              <div key={fav.product._id} className="product-card">
                <h3>
                  <Link to={`/products/${fav.product._id}`}>{fav.product.name}</Link>
                </h3>
                <p>Type: {fav.product.type}</p>
                <p>Alcohol: {fav.product.alcoholPercentage}%</p>
                <p>Price: ${fav.product.price.toFixed(2)}</p>
                {/* Button to remove from favorites */}
                <button onClick={() => handleRemoveFromFavorites(fav.product._id)}>
                  Remove from Favorites
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
