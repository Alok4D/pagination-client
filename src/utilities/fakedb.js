const getShoppingCart = () => {
  const storedCart = localStorage.getItem("shopping-cart");
  return storedCart ? JSON.parse(storedCart) : {};
};

const addToDb = (id) => {
  const shoppingCart = getShoppingCart();
  shoppingCart[id] = shoppingCart[id] ? shoppingCart[id] + 1 : 1;
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const removeFromDb = (id) => {
  const shoppingCart = getShoppingCart();
  if (shoppingCart[id]) {
    delete shoppingCart[id];
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("shopping-cart");
};

export { addToDb, removeFromDb, getShoppingCart, deleteShoppingCart };
``
