import "./style.css";

export const createProductDetailsCard = (product) => `
   <div class="card-details">
      <p>${product.name}</p>
      <img src=${product.image} />
      <p>${product.price}</p>
      <h4>${product.details}</h4>
      <h5>${product.greutate}</h5>
      <button class="add-to-cart-btn">Add To Cart</button>
      <br>
   </div>
`;
