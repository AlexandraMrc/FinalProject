import { productsURL } from "../constans.js";

const getProducts = async () => {
  const response = await fetch(productsURL);
  const products = await response.json();
  return products;
};
