import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart() || {};
  const storedCartIds = Object.keys(storedCart);

  if (storedCartIds.length === 0) return [];

  const res = await fetch("http://localhost:5000/productsByIds", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(storedCartIds),
  });

  const products = await res.json();

  const savedCart = [];
  for (const id in storedCart) {
    const addedProduct = products.find(pd => pd._id.toString() === id);
    if (addedProduct) {
      addedProduct.quantity = storedCart[id];
      savedCart.push(addedProduct);
    }
  }

  return savedCart;
};

export default cartProductsLoader;
