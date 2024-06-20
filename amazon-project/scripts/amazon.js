import {products} from '../data/products.js';
import { Cart } from '../data/cart-class.js';

let cart = new Cart('cart-oop');

let productsHTML = "";

products.forEach((product) => {
    const html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `
    productsHTML += html;
})

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelector(".products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        cart.addToCart(productId);
        updateCartQuantity();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
});

//working fine