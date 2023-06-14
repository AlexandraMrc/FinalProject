import "../../../style.css";
import { getProductById } from "../../api/getProductById.js";
import { getProducts } from "../../api/getProduct.js";
//import { createProductDetailsCard } from "../../components/productDetailsCard.js";

// const butonAdaugareProduse = document.querySelector("#btnAddNewProd");
// butonAdaugareProduse.addEventListener("click", adaugaProduseNoi);
// function adaugaProduseNoi() {
//     const newProducts =
// }

const setAdminLocalStorage = async () => {
  localStorage.removeItem("admin");
  const products = await getProducts();
  localStorage.setItem("admin", JSON.stringify(products));
};

const AdminTableProducts = async () => {
  const adminStorage = localStorage.getItem("admin");
  const adminProducts = JSON.parse(adminStorage);
  adminProducts.forEach((product) => {
    getProductById(product.id).then(
      (productInfo) =>
        (document.getElementById("tableBody").innerHTML += `
  <tr><td><img src=${productInfo.image} width="30px"></td>
  <td>${productInfo.name}</td>
  <td>${productInfo.price}</td>
  <td>${productInfo.cantitate}</td>
  <td><button id="${product.id}" onClick="reply_click(this.id)"> Sterge</button></td> </tr>
  `)
    );
  });
};

const reply_click = (btnid) => alert(btnid);

window.addEventListener("load", AdminTableProducts);
window.addEventListener("load", setAdminLocalStorage);
