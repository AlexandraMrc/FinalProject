import "./style.css";
import { addToCart } from "../utils/cart";

export const createProductDetailsCard = (product) => `
   <div class="card details">
      <p>${product.name}</p>
      <img src=${product.image} />
      <p>${product.price}</p>
      <a href="/src/pages/details/details.html?id=${product.id}">Details</a>
      <button class=add-to-cart-btn>Add to cart </button>
      <p>${product.detail}</p>
   </div>
`;
