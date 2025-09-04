import React from "react";
import "./Product.css";

const Product = ({ product, handleAddToCart, isAdded }) => {
  const { name, img, price, shipping } = product;

  return (
    <div className="product-card">
      <img src={img} alt={name} className="product-img" />
      <h4 className="product-name">{name}</h4>
      <p>Price: ${price}</p>
      <p>Shipping: ${shipping}</p>
      <button
        className="btn-cart"
        onClick={() => handleAddToCart(product)}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default Product;
