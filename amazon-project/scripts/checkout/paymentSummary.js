// import {cart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { deliveryOptions, getDeliveryOptions} from '../../data/deliveryOptions.js';

import{Cart} from '../../data/cart-class.js';

let cart = new Cart('cart-oop');

export function renderPaymentSummary() {
    let totalPricecents = 0;
    let shippingPriceCents = 0;
    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.id);    
        totalPricecents += (product.priceCents * cartItem.quantity);

        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = shippingPriceCents + totalPricecents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${(Math.round(totalPricecents) / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(Math.round(shippingPriceCents) / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(Math.round(totalBeforeTaxCents) / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(Math.round(taxCents) / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(Math.round(totalCents) / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

//working fine