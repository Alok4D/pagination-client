import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import "./Orders.css";

const Orders = () => {
  const savedCart = useLoaderData(); // cartProductsLoader
  const [cart, setCart] = useState(savedCart);

  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter(p => p._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.length > 0 ? (
          cart.map(product => (
            <ReviewItem
              key={product._id}
              product={product}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))
        ) : (
          <h2>Your cart is empty 🛒</h2>
        )}
      </div>

      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/checkout">
            <button className="btn-proceed" disabled={cart.length === 0}>Proceed Checkout</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
