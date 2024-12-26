import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, onViewCart }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Item Added to Cart!</h3>
        <p>Would you like to view your cart or continue shopping?</p>
        <div className="modal-buttons">
          <button onClick={onViewCart} className="view-cart-btn">
            View Cart
          </button>
          <button onClick={onClose} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
