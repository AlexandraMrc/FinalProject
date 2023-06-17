import "../../../style.css";
import { getProductById } from "../../api/getProductById.js";
import { getProducts } from "../../api/getProduct.js";
import { deleteProductById } from "../../api/deleteProductById";
import { addProduct } from "../../api/addProduct";
//import { createProductDetailsCard } from "../../components/productDetailsCard.js";

const tableBody = document.getElementById("tableBody");

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
  <tr id=p${product.id}><td><img src=${productInfo.image} width="30px"></td>
  <td>${productInfo.name}</td>
  <td>${productInfo.price}</td>
  <td><button class='delete-product'> Sterge </button></td> </tr>
  `)
    );
  });
};

tableBody.addEventListener("click", onClick);

async function onClick(e) {
  if (e.target.classList.contains("delete-product")) {
    const id = e.target.parentNode.parentNode.id.substring(1);
    e.target.parentNode.parentNode.remove();
    const response = await deleteProductById(id);
    console.log(response);
  }
}

window.addEventListener("load", AdminTableProducts);
window.addEventListener("load", setAdminLocalStorage);

const btnAdaugareProduse = document.querySelector("#btnAddNewProd");

const tabelAscuns = document.querySelector("#hidden");
btnAdaugareProduse.addEventListener("click", adaugaProduseNoi);
function adaugaProduseNoi() {
  tabelAscuns.style.display = "table";
}

const btnAscundereTabel = document.querySelector("#cancel");
btnAscundereTabel.addEventListener("click", cancelProduseNoi);
function cancelProduseNoi() {
  tabelAscuns.style.display = "none";
}

const btnSaveProduct = document.querySelector("#save");
btnSaveProduct.addEventListener("click", saveProduseNoi);
var image = document.querySelector("#image");
var name = document.querySelector("#name");
var inputDescriereProdus = document.querySelector("#inputDescriereProdus");
var price = document.querySelector("#price");
var quantity = document.querySelector("#quantity");

function saveProduseNoi() {
  var imageValue = image.value;
  var namesValue = name.value;
  var inputDescriereProdusValue = inputDescriereProdus.value;
  var priceValue = price.value;
  var quantityValue = quantity.value;
  addProduct(
    imageValue,
    namesValue,
    inputDescriereProdusValue,
    priceValue,
    quantityValue
  );
  document.getElementById("image").value = "";
  document.getElementById("name").value = "";
  document.getElementById("inputDescriereProdus").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}

//golire field-uri dupa apasarea butonului Save
// const btnEmptyField = document.getElementById("save");
// btnEmptyField.addEventListener("click", emptyField);
// function emptyField() {
//   if (btnEmptyField.value != "") {
//     btnEmptyField.value = ""
//   }
// }
