import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart = [], handleClearCart, children }) => {
  // start all totals from 0
  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;

  if (cart.length > 0) {
    for (const product of cart) {
      const qty = product.quantity || 0; // default 0
      totalPrice += (product.price || 0) * qty;
      totalShipping += (product.shipping || 0) * qty;
      quantity += qty;
    }
  }

  const tax = totalPrice * 0.07;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart-card">
      <h3>🛒 Order Summary</h3>
      <div className="cart-details">
        <p>Selected Items: <span>{quantity}</span></p>
        <p>Total Price: <span>${totalPrice.toFixed(2)}</span></p>
        <p>Total Shipping: <span>${totalShipping.toFixed(2)}</span></p>
        <p>Tax (7%): <span>${tax.toFixed(2)}</span></p>
        <h4>Grand Total: <span>${grandTotal.toFixed(2)}</span></h4>
      </div>

      <button
        className="btn-clear-cart"
        onClick={handleClearCart}
        disabled={cart.length === 0}
      >
        <FontAwesomeIcon icon={faTrashAlt} /> Clear Cart
      </button>

      <div className="cart-children">{children}</div>
    </div>
  );
};

export default Cart;
