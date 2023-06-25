import "../../../style.css";
import { getProductById } from "../../api/getProductById.js";
import { getProducts } from "../../api/getProduct.js";
import { deleteProductById } from "../../api/deleteProductById";
import { addProduct } from "../../api/addProduct";
// import { editProduct } from "../../api/editProduct";

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
        <tr id=p${product.id}>
        <td><img src=${productInfo.image} width="30px"></td>
        <td>${productInfo.name}</td>
        <td>${productInfo.price}</td>
        <td><button class='edit-product'> Edit </button></td>
        <td><button class='delete-product'> Sterge </button></td> </tr>
        <tbody hidden id="hiddenp${product.id}">
          <tr>
            <td id="idEditProdus">Editare produs</td>
            <td><button id="saveEdit"><i class="fa-regular fa-plus"></i> Save</button></td>
            <td><button id="cancelEdit">Cancel</button></td>
          </tr>
          <tr><td>Imagine</td><td><input type="text" id="imageEdit" value="${productInfo.image}"></td></tr>
          <tr><td>Nume</td><td><input type="text" id="nameEdit" value="${productInfo.name}"></td></tr>
          <tr><td>Descriere</td><td><input type="text" id="inputDescriereProdusEdit" value="${productInfo.details}"></td></tr>
          <tr><td>Pret</td><td><input type="text" id="priceEdit" value="${productInfo.price}"></td></tr>
          <tr><td>Cantitate</td><td><input type="number" id="quantityEdit" value="${productInfo.inStoc}"></td></tr>
        </tbody> 
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
  } else if (e.target.classList.contains("edit-product")) {
    const id = e.target.parentNode.parentNode.id.substring(1);
    editProdus(id);
  }
}

window.addEventListener("load", AdminTableProducts);
window.addEventListener("load", setAdminLocalStorage);

const btnAdaugareProduse = document.querySelector("#btnAddNewProd");

const tabelAscuns = document.querySelector("#newproducthidden");
btnAdaugareProduse.addEventListener("click", adaugaProduseNoi);
function adaugaProduseNoi() {
  tabelAscuns.style.display = "table";
}

function editProdus(id) {
  const hiddenid = id;
  const editTabelAscuns = document.getElementById("hiddenp" + hiddenid);
  editTabelAscuns.style.display = "table";
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
