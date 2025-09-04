import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { _id, img, name, price, quantity, shipping } = product;

  return (
    <div className="review-item">
      <img src={img} alt={name} className="review-img" />
      <div className="review-details">
        <h4>{name}</h4>
        <p>Price: <span className="orange-text">${price}</span></p>
        <p>Quantity: <span className="orange-text">{quantity}</span></p>
        <p>Shipping: <span className="orange-text">${shipping || 0}</span></p>
        <p>Subtotal: <span className="orange-text">${(price * quantity).toFixed(2)}</span></p>
      </div>
      <button onClick={() => handleRemoveFromCart(_id)} className="btn-delete">
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;
