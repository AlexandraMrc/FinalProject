import { productsURL } from "../constans";

export const addProduct = async (image, name, description, price, quantity) => {
  const response = await fetch(`${productsURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      image: image,
      details: description,
      price: price + " " + "Lei",
      inStoc: quantity,
    }),
  });
  const product = await response.json();
  console.log(product);
  return product;
};
