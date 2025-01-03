import React, { useState, useEffect } from "react";
import CartService from "../services/CartService";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await CartService.getCartItems();
        setCartItems(data);
      } catch (err) {
        setCartError("Failed to load cart items.");
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const updatedItem = await CartService.updateCartItem(productId, newQuantity );
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (err) {
      setCartError("Failed to update quantity.");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await CartService.removeFromCart(productId);
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      setCartError("Failed to remove item.");
    }
  };

  const handleClearCart = async () => {
    try {
      await CartService.clearCart();
      setCartItems([]);
    } catch (err) {
      setCartError("Failed to clear cart.");
    }
  };

  const totalSum = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>
      {cartLoading && <p>Loading cart...</p>}
      {cartError && <p className="error">{cartError}</p>}
      {!cartLoading && cartItems.length === 0 && <p>Your cart is empty.</p>}
      {!cartLoading && cartItems.length > 0 && (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-card">
                <h3>{item.product.name}</h3>
                <p>Price: ${item.product.price.toFixed(2)}</p>
                <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.product._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Sum: ${totalSum.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleClearCart}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
