import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BeerService from "../services/BeerService";
import FavoriteService from "../services/FavoriteService";  // Import FavoriteService
import CartService from "../services/CartService";  // Import CartService
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Track if the product is a favorite
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await BeerService.getBeerById(productId);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    // Check if the product is already in favorites
    const checkIfFavorite = async () => {
      try {
        const favoriteList = await FavoriteService.getFavorites();
        const isInFavorites = favoriteList.some((fav) => fav.product._id === productId);
        setIsFavorite(isInFavorites);
      } catch (err) {
        console.error("Error checking favorites:", err);
      }
    };

    fetchProductDetails();
    checkIfFavorite();
  }, [productId]);

  const handleAddToFavorites = async () => {
    try {
      await FavoriteService.addFavorite(productId);
      setIsFavorite(true);
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await FavoriteService.removeFavorite(productId);
      setIsFavorite(false);
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };

  const handleAddToCart = async () => {
    try {
      await CartService.addToCart(productId, 1);  // Assuming adding 1 quantity
      setIsModalOpen(true); // Open the modal after adding to cart
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>Brewery:</strong> {product.brewery.name}</p>
      <p><strong>Alcohol Percentage:</strong> {product.alcoholPercentage}%</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <div className="buttons">
        {isFavorite ? (
          <button onClick={handleRemoveFromFavorites} className="add-to-favorites">Remove from Favorites</button>
        ) : (
          <button onClick={handleAddToFavorites} className="add-to-favorites">Add to Favorites</button>
        )}
        <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button>
      </div>

      {/* Modal for View Cart */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Item Added to Cart</h2>
            <p>Your product has been added to the cart.</p>
            <Link to="/cart">
              <button onClick={handleCloseModal}>View Cart</button>
            </Link>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
