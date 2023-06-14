import "./style.css";
import { addProductToCart } from "../utils/cart";

export const createProductDetailsCard = (product) => `
   <div class="card-details">
      <p>${product.name}</p>
      <img src=${product.image} />
      <p>${product.price}</p>
      <h4>${product.details}</h4>
      <h5>In stoc: ${product.inStoc} buc</h5>
      <h4>Cantitate: ${product.cantitate}<input type="number" placeholder="1"><h4>
      <button class="add-to-cart-btn">Add To Cart</button>
      <br>
   </div>
`;

// const btnAddToCart = document.querySelector(".add-to-cart-btn");
// btnAddToCart.addEventListener("click", addProduct);
// function addProduct() {
//   alert("Produsul a fost adaugat in cos.");
// }
