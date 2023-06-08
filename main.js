import "./style.css";
import { getProducts } from "./src/api/getProduct.js";
import { createProductCard } from "./src/components/productCard.js";

window.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  document.getElementById("products").innerHTML = products
    .map((product) => createProductCard(product))
    .join("");
});
