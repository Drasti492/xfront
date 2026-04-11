// js/cart.js

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-20 text-gray-400">
                <p class="text-2xl mb-4">Your cart is empty</p>
                <a href="../index.html" class="text-pink-600 underline">Start Shopping</a>
            </div>`;
        updateTotals();
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * (item.qty || 1);
        subtotal += itemTotal;

    container.innerHTML += `
<div class="cart-item flex items-center gap-6 border-b pb-6 mb-6">

    <!-- IMAGE -->
   <img src="${item.image || '../images/placeholder.png'}"
     onerror="this.src='../images/placeholder.png'"
     class="w-20 h-20 object-contain bg-white p-2 rounded-xl border">

    <!-- DETAILS -->
    <div class="flex-1">
        <h4 class="font-semibold text-sm">${item.name}</h4>
        <p class="text-pink-600 text-xs">KSh ${item.price}</p>

        <div class="flex items-center gap-4 mt-3">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
        </div>
    </div>

    <!-- TOTAL -->
    <div class="font-semibold text-sm">
        KSh ${item.price * (item.qty || 1)}
    </div>

    <!-- REMOVE -->
    <button onclick="removeItem(${index})" class="text-red-500">✕</button>

</div>`;
    });

    updateTotals();
}

function changeQty(index, delta) {
    cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
    localStorage.setItem('luminaCart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('luminaCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    document.getElementById('subtotal').textContent = 'KSh ' + subtotal;
    document.getElementById('total').textContent = 'KSh ' + subtotal;
}

function checkout() {
    if (cart.length === 0) return;
    alert("✅ Thank you! checkout successful.\nYour order has been placed.");
    cart = [];
    localStorage.setItem('luminaCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

window.addEventListener('load', renderCart);