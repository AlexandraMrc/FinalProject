import { getProductById } from '../../api/getProductById';
import {
	decrementProductQuantity,
	incrementProductQuantity,
} from '../../utils/cart';

const showProducts = async () => {
	const cart = localStorage.getItem('cart');
	const sortedProductsById = JSON.parse(cart).sort(
		(product1, product2) => product1.id - product2.id
	);
	document.getElementById('cart').innerHTML = '';
	sortedProductsById.forEach((product) => {
		getProductById(product.id).then(
			(productInfo) =>
				(document.getElementById('cart').innerHTML += `<div>
            <span>${productInfo.name}</span>
            <span>${productInfo.price}</span>
            <img src=${productInfo.image} width="30px" />
            <button id=${product.id} class="decrement-quantity">-</button>
            <span>${product.quantity}</span>
            <button id=${product.id} class="increment-quantity">+</button>
      </div>`)
		);
	});
};
window.addEventListener('load', showProducts);

document.getElementById('cart').addEventListener('click', async (e) => {
	const cartArray = JSON.parse(localStorage.getItem('cart'));
	const productId = e.target.id;

	if (e.target.classList.contains('decrement-quantity')) {
		decrementProductQuantity(productId, cartArray);
	} else if (e.target.classList.contains('increment-quantity')) {
		incrementProductQuantity(productId, cartArray);
	}

	localStorage.setItem('cart', JSON.stringify(cartArray));
	await showProducts();
});