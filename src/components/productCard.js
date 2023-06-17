import "./style.css";

export const createProductCard = (product) => `
   <div class="card">
      <p>${product.name}</p>
      <img src=${product.image} />
      <p>${product.price}</p>
      <a href="src/pages/details/details.html?id=${product.id}">DETALII</a>
   </div>
`;
