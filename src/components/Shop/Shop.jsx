import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart, deleteShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPtCount, setTotalPtCount] = useState(0);
  const [page, setPage] = useState(0);

  const itemPerPage = 9;

  // fetch total products count
  useEffect(() => {
    fetch("http://localhost:5000/productsCount")
      .then(res => res.json())
      .then(data => setTotalPtCount(data.count));
  }, []);

  const numberOfPages = Math.ceil(totalPtCount / itemPerPage);

  // fetch products for current page
  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&size=${itemPerPage}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [page]);

  // Load cart from localStorage and merge with current cart
  useEffect(() => {
    const storedCart = getShoppingCart();
    const mergedCart = [];

    // add stored cart products from localStorage
    for (const id in storedCart) {
      // check if already in current cart
      const alreadyInCart = cart.find(p => p._id === id);
      if (alreadyInCart) {
        mergedCart.push(alreadyInCart);
      } else {
        const productFromPage = products.find(p => p._id === id);
        if (productFromPage) {
          mergedCart.push({ ...productFromPage, quantity: storedCart[id] });
        }
      }
    }

    // add previous cart items not in mergedCart
    const remaining = cart.filter(p => !mergedCart.find(m => m._id === p._id));

    setCart([...mergedCart, ...remaining]);
  }, [products]);

  // Add to cart handler (prevent duplicates)
  const handleAddToCart = (product) => {
    const exists = cart.find(p => p._id === product._id);
    if (exists) {
      alert("This product is already in the cart!");
      return;
    }
    const newCart = [...cart, { ...product, quantity: 1 }];
    setCart(newCart);
    addToDb(product._id);
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // Pagination
  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < numberOfPages - 1) setPage(page + 1);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map(product => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
            isAdded={cart.some(p => p._id === product._id)}
          />
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button className="btn-proceed" disabled={cart.length === 0}>
              Review Order
            </button>
          </Link>
        </Cart>
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 0}>
          « Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page + 1} of {numberOfPages}
        </span>
        <button onClick={handleNext} disabled={page === numberOfPages - 1}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default Shop;
