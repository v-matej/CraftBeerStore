import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeerService from "../services/BeerService";
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchProductDetails();
  }, [productId]);

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
    </div>
  );
};

export default ProductDetailsPage;
