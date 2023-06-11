import { productsURL } from "../constans.js";

export const getProductById = async (id) => {
  const response = await fetch(`${productsURL}/${id}`);
  const product = await response.json();
  return product;
};
