import { getProductById } from "../../api/getProductById.js";
import { createProductDetailsCard } from "../../components/productDetailsCard.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

window.addEventListener("load", async () => {
  const product = await getProductById(productId);

  document.getElementById("details").innerHTML =
    createProductDetailsCard(product);
});
