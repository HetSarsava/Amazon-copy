import {products, getProduct} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOptions} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';

import {Cart} from '../../data/cart-class.js';

let cart = new Cart('cart-oop');

export function renderOrderSummary() {

    let checkoutHTML = '';

    cart.cartItems.forEach((item) => {

        const matchingProduct = getProduct(item.id);

        const deliveryOptionId = item.deliveryOptionId;
        const deliveryOption = getDeliveryOptions(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        checkoutHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
    
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${(matchingProduct.priceCents / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${item.quantity}</span>
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${delievryOptionsHTML(item)}
                    </div>
                </div>
            </div>
        `;
    });

    function delievryOptionsHTML(item) {
        let html = ''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`
            const isChecked = deliveryOption.id === item.deliveryOptionId;
            html += `
                <div class="delivery-option js-delivery-option" data-product-id='${item.id}' data-delivery-option-id='${deliveryOption.id}'>
                    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${item.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
                </div>
            `
        });
        return html;
    }

    document.querySelector(".order-summary").innerHTML = checkoutHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            cart.removeFromCart(productId);
            console.log(cart);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderPaymentSummary();
            location.reload(true);
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
            location.reload(true);
        })
    })
}

//working fine