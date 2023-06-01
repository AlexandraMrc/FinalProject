export const createProductCard = (product) => `
<div class="card"> 
<h3>${product.productName} </h3>
<img src=${product.productImage}  />
<h4>${product.price}></h4>
<a href="/src/pages/details?id=${product.id}">Details</a>
</div>`;
