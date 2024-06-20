export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem = cart.find(item => item.id === productId);
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((item) => {
        if (item.id !== productId) {
            newCart.push(item);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryoptionId) {
    let matchingItem = cart.find(item => item.id === productId);
    matchingItem.deliveryOptionId = deliveryoptionId;
    saveToStorage();
}

//working fine