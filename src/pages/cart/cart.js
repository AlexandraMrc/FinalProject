import "../../../style.css";
import { getProductById } from "../../api/getProductById";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  getProductQuantityFromLocalStorage,
  isProductAlreadyInCart,
} from "../../utils/cart";

const cart = localStorage.getItem("cart");
const products = JSON.parse(cart);

const showProducts = async () => {
  document.getElementById("cart").innerHTML = "";
  products.forEach((product) => {
    getProductById(product.id).then(
      (productInfo) =>
        (document.getElementById("cart").innerHTML += `<tr id=p${product.id}>
        <td>${productInfo.name}</td>
        <td><img src=${productInfo.image} width="30px" /></td>
            <td id ="price">${productInfo.price}</td>
            <td><button id=${product.id} class="decrement-quantity">-</button></td>
            <td id="q${product.id}">${product.quantity}</td>
            <td><button id=${product.id} class="increment-quantity">+</button></td>
            <td><button class='delete-product'> Sterge </button></td></tr>`)
    );
  });
};
window.addEventListener("load", showProducts);

document.getElementById("cart").addEventListener("click", async (e) => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const productId = e.target.id;

  if (e.target.classList.contains("decrement-quantity")) {
    decrementProductQuantity(productId, cartArray);
    sumaTotal();
  } else if (e.target.classList.contains("increment-quantity")) {
    incrementProductQuantity(productId, cartArray);
    sumaTotal();
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));

  if (!isProductAlreadyInCart(productId, cartArray)) {
    // document
    //   .getElementById("cart")
    //   .querySelector("#p" + productId)
    //   .deleteProductById();
  } else {
    document.getElementById("cart").querySelector("#q" + productId).innerHTML =
      getProductQuantityFromLocalStorage(productId, cartArray);
  }
});

const tabelCos = document.querySelector(".tabelCumparaturi");
tabelCos.addEventListener("click", stergeProdusCos);

async function stergeProdusCos(e) {
  if (e.target.classList.contains("delete-product")) {
    const id = e.target.parentNode.parentNode.id.substring(1);
    e.target.parentNode.parentNode.remove();
  }
  sumaTotal();
}

// total cos:
//sa folosesc local storage;
// cu subtotal

export function calculeazaTotalCos() {
  let total = 0;
  for (const product of products) {
    const priceElement = document
      .getElementById("cart")
      .querySelector("#p" + product.id)
      .querySelector("#price");
    const cantitate = document
      .getElementById("cart")
      .querySelector("#q" + product.id);
    const priceValue = parseFloat(priceElement.innerHTML);
    const quantityValue = parseInt(cantitate.innerHTML);
    total += priceValue * quantityValue;
    console.log(total.toFixed(3));
  }
  return total.toFixed(3);
}

function sumaTotal() {
  const total = calculeazaTotalCos();
  document.getElementById("totalP").innerHTML = "Total: " + total + " " + "Lei";
}

window.addEventListener("load", sumaTotal);
