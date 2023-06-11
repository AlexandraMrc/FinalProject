import "../../../style.css";
import { getProductById } from "../../api/getProductById";
import { createProductDetailsCard } from "../../components/productDetailsCard";
import { addProductToCart } from "../../utils/cart";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

window.addEventListener("load", async () => {
  const product = await getProductById(productId);

  document.getElementById("details").innerHTML =
    createProductDetailsCard(product);
});

document.getElementById("details").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addProductToCart(productId);
  }
});
