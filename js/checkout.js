        // Kenya Counties and Towns 
        const countiesData = {
            "Nairobi": ["Nairobi CBD", "Westlands", "Kilimani", "Lavington", "South C", "Eastleigh", "Kasarani", "Langata", "Embakasi", "Ruaraka"],
            "Kiambu": ["Thika", "Ruiru", "Kiambu Town", "Limuru", "Kikuyu", "Githunguri", "Karuri", "Juja"],
            "Nakuru": ["Nakuru Town", "Naivasha", "Gilgil", "Njoro", "Molo", "Subukia"],
            "Kisumu": ["Kisumu CBD", "Kondele", "Nyakach", "Maseno", "Ahero"],
            "Mombasa": ["Mombasa Island", "Nyali", "Likoni", "Bamburi", "Changamwe"],
            "Uasin Gishu": ["Eldoret CBD", "Kitale", "Turbo", "Soy"],
            "Nandi": ["Kapsabet", "Nandi Hills", "Tinderet", "Mosoriot", "Chemelil"],
            "Kericho": ["Kericho Town", "Litein", "Kapkatet", "Kipkelion", "Sigowet"],
            "Bomet": ["Bomet Town", "Sotik", "Longisa", "Chepalungu"],
            "Kakamega": ["Kakamega Town", "Mumias", "Butere", "Shinyalu"],
            "Bungoma": ["Bungoma Town", "Webuye", "Kimilili", "Chwele"],
            "Busia": ["Busia Town", "Malaba", "Port Victoria"],
            "Nyeri": ["Nyeri Town", "Nyahururu", "Othaya", "Karatina"],
            "Meru": ["Meru Town", "Nkubu", "Maua", "Chuka"],
            "Machakos": ["Machakos Town", "Mlolongo", "Athi River", "Kangundo"],
            "Kajiado": ["Kajiado Town", "Ngong", "Kitengela", "Ongata Rongai"],
            "Kilifi": ["Kilifi Town", "Malindi", "Watamu", "Mtwapa"],
            "Kwale": ["Kwale Town", "Ukunda", "Diani"]
        };

        function populateTowns() {
            const countySelect = document.getElementById('county');
            const townSelect = document.getElementById('town');

            countySelect.addEventListener('change', () => {
                const selectedCounty = countySelect.value;
                townSelect.innerHTML = '<option value="">Select Town / Area</option>';

                if (countiesData[selectedCounty]) {
                    countiesData[selectedCounty].forEach(town => {
                        const option = document.createElement('option');
                        option.value = town;
                        option.textContent = town;
                        townSelect.appendChild(option);
                    });
                }
            });
        }

        function renderCheckoutCart() {
            const cart = JSON.parse(localStorage.getItem('luminaCart')) || [];
            const container = document.getElementById('checkout-cart-items');
            let subtotal = 0;

            container.innerHTML = '';

            if (cart.length === 0) {
                container.innerHTML = `<p class="text-gray-500 text-center py-8">Your cart is empty.</p>`;
                return;
            }

            cart.forEach(item => {
                const itemTotal = item.price * (item.qty || 1);
                subtotal += itemTotal;

                const div = document.createElement('div');
                div.className = "flex gap-4 border-b border-pink-100 pb-4 last:border-0";
                div.innerHTML = `
                    <div class="flex-1">
                        <h5 class="font-medium text-sm">${item.name}</h5>
                        <p class="text-xs text-gray-500">Qty: ${item.qty || 1}</p>
                    </div>
                    <div class="text-right font-medium">
                        KSh ${itemTotal}
                    </div>
                `;
                container.appendChild(div);
            });

            document.getElementById('checkout-subtotal').textContent = `KSh ${subtotal}`;
            document.getElementById('checkout-total').textContent = `KSh ${subtotal}`;
        }
function normalizePhone(input) {
    let phone = input.replace(/\D/g, "");

    if (phone.startsWith("0")) phone = "254" + phone.slice(1);
    if (phone.length === 9) phone = "254" + phone;

    if (!phone.startsWith("254") || phone.length !== 12) return null;

    return phone;
}

function showModal(state) {
    const modal = document.getElementById("paymentModal");
    modal.classList.remove("hidden");

    document.querySelectorAll(".state").forEach(s => s.classList.remove("active"));
    state.classList.add("active");
}

function submitOrder() {
    const form = document.getElementById('checkout-form');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const phoneInput = document.getElementById("paymentPhone").value;
    const phone = normalizePhone(phoneInput);

    if (!phone) {
        alert("Enter valid M-Pesa number");
        return;
    }

    const amount = parseInt(document.getElementById('checkout-total').textContent.replace('KSh ', ''));

    showModal(document.querySelector(".loading-state"));

    // STEP 1: INITIATE PAYMENT
    fetch("https://xback-hrom.onrender.com/api/payment/stk-push", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, amountKES: amount })
    })
    .then(res => res.json())
    .then(data => {

        if (!data.success) throw new Error("Payment failed");

        const reference = data.reference;

        let attempts = 0;

        const poll = setInterval(() => {
            attempts++;

            fetch(`https://xback-hrom.onrender.com/api/payment/status/${reference}`)
                .then(res => res.json())
                .then(statusData => {

                    if (statusData.status === "success") {
                        clearInterval(poll);

                        showModal(document.querySelector(".success-state"));

                        // SAVE ORDER AFTER PAYMENT SUCCESS
                        saveOrder();

                    } else if (statusData.status === "failed" || attempts > 30) {
                        clearInterval(poll);
                        showModal(document.querySelector(".error-state"));
                    }
                });

        }, 4000);

    })
    .catch(err => {
        console.error(err);
        showModal(document.querySelector(".error-state"));
    });
}

function saveOrder() {
    const orderData = {
        items: JSON.parse(localStorage.getItem('luminaCart')) || [],
        total: parseInt(document.getElementById('checkout-total').textContent.replace('KSh ', '')),
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        county: document.getElementById('county').value,
        town: document.getElementById('town').value,
        address: document.getElementById('address').value,
        date: new Date().toISOString()
    };

    fetch("https://xback-hrom.onrender.com/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(() => {
        localStorage.removeItem('luminaCart');

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000);
    });
}

        // Initialize
        window.onload = function() {
            updateCartCount();
            renderCheckoutCart();
            populateTowns();
        };
   