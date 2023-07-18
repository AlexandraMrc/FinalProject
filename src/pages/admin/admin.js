import "../../../style.css";
import { getProductById } from "../../api/getProductById.js";
import { getProducts } from "../../api/getProduct.js";
import { deleteProductById } from "../../api/deleteProductById";
import { addProduct } from "../../api/addProduct";
import { editProduct } from "../../api/editProduct";

const tableBody = document.getElementById("tableBody");

const setAdminLocalStorage = async () => {
  localStorage.removeItem("admin"); //elimina valoarea stocata in 'admin' din local storage
  const products = await getProducts();
  localStorage.setItem("admin", JSON.stringify(products)); //stocheaza valoarea produselor in local storage, stransformand-o prima data in format JSON
};

const adminTableProducts = async () => {
  const adminStorage = localStorage.getItem("admin"); //obtinem valoarea din local storage si o atribuim var adminStorage
  const adminProducts = JSON.parse(adminStorage); //transforma valoarea din local storage, adica JSON, in obiect JS.
  adminProducts.forEach((product) => {
    //parcurge fiecare element din array-ul de mai sus
    getProductById(product.id).then(
      //returneaza o promisiune, cand e rezolvata, se executa functia .then()
      (productInfo) =>
        (document.getElementById("tableBody").innerHTML += `      
        <tr id=p${product.id}>
        <td><img src=${productInfo.image} width="30px"></td>
        <td>${productInfo.name}</td>
        <td>${productInfo.price}</td>
        <td><button class='edit-product'> Editare </button></td>
        <td><button class='delete-product'> Sterge </button></td> </tr>
        <div id="hiddenp${product.id}" style="display:none;" >
        <fieldset class="editForm">
        <p class="pEditare"> Editare Produs </p>
        <form action='tuscript.php' >
        <label for="imageEdit">Imagine</label>
        <input type="text" name="imageEdit" id="imageEditp${product.id}" class="text" value="${productInfo.image}">
        <label for="nameEdit">Nume</label>
        <input type="text" name="nameEdit" id="nameEditp${product.id}" value="${productInfo.name}" class="text">
        <label for="inputDescriereProdusEdit">Descriere</label>
        <input type="text" name="nameEdit" id="inputDescriereProdusEditp${product.id}" value="${productInfo.details}" class="text">
        <label for="priceEdit">Pret</label>
        <input type="text" name="nameEdit" id="priceEditp${product.id}" value="${productInfo.price}" class="text">
        <label for="quantityEdit">Cantitate</label>
        <input type="text" name="nameEdit" id="quantityEditp${product.id}" value="${productInfo.inStoc}" class="text">
        <button class="save-edit"><i class="fa-regular fa-plus"></i> Save</button>
        </form>
        </fieldset>
        </div> 
  `)
    );
  });
};

tableBody.addEventListener("click", onClick);

async function onClick(e) {
  if (e.target.classList.contains("delete-product")) {
    //daca elem pe care s-a facut click are clasa 'delete-product'
    const id = e.target.parentNode.parentNode.id.substring(1);
    let text = "Sigur doresti sa stergi acest produs?";
    if (confirm(text) == true) {
      e.target.parentNode.parentNode.remove();
    } //elimina elementul parinte al butonului din DOM
    const response = await deleteProductById(id); //apeleaza functia si asteapta rez promisiunii
    console.log(response);
  } else if (e.target.classList.contains("edit-product")) {
    const id = e.target.parentNode.parentNode.id.substring(1);
    editProdus(id);
  } else if (e.target.classList.contains("save-edit")) {
    const id = e.target.parentNode.parentNode.id.substring(1);
    const editImage = document.getElementById("imageEditp" + id);
    const editName = document.getElementById("nameEditp" + id);
    const editInputDescriereProdus = document.getElementById(
      "inputDescriereProdusEditp" + id
    );
    const editPrice = document.getElementById("priceEditp" + id);
    const editQuantity = document.getElementById("quantityEditp" + id);
    saveEditProduct(
      id,
      editImage,
      editName,
      editInputDescriereProdus,
      editPrice,
      editQuantity
    );
  }
}

window.addEventListener("load", adminTableProducts);
window.addEventListener("load", setAdminLocalStorage);

//Add products

const btnAdaugareProduse = document.querySelector("#btnAddNewProd");

const tabelAscuns = document.querySelector("#newproducthidden");
btnAdaugareProduse.addEventListener("click", adaugaProduseNoi);
function adaugaProduseNoi() {
  tabelAscuns.style.display = "table";
}

const btnAscundereTabel = document.querySelector("#cancel");
btnAscundereTabel.addEventListener("click", cancelProduseNoi);
function cancelProduseNoi() {
  tabelAscuns.style.display = "none";
}

// Save products
const btnSaveProduct = document.querySelector("#save");
btnSaveProduct.addEventListener("click", saveProduseNoi);
let image = document.querySelector("#image");
let name = document.querySelector("#name");
let inputDescriereProdus = document.querySelector("#inputDescriereProdus");
let price = document.querySelector("#price");
let quantity = document.querySelector("#quantity");

function saveProduseNoi() {
  let imageValue = image.value;
  let namesValue = name.value;
  let inputDescriereProdusValue = inputDescriereProdus.value;
  let priceValue = price.value;
  let quantityValue = quantity.value;
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

// Edit products

function editProdus(id) {
  const hiddenid = id;
  const editTabelAscuns = document.getElementById("hiddenp" + hiddenid);
  $(editTabelAscuns).dialog();
}

function saveEditProduct() {
  let editImageValue = editImage.value;
  let editNamesValue = editName.value;
  let editInputDescriereProdusValue = editInputDescriereProdus.value;
  let editPriceValue = editPrice.value;
  let editQuantityValue = editQuantity.value;

  editProduct(
    editImageValue,
    editNamesValue,
    editInputDescriereProdusValue,
    editPriceValue,
    editQuantityValue
  );
  alert("Modificari salvate");
}
