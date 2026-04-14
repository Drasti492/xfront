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

function submitOrder() {
    const form = document.getElementById('checkout-form');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const orderData = {
        items: JSON.parse(localStorage.getItem('luminaCart')) || [],
        total: parseInt(document.getElementById('checkout-total').textContent.replace('KSh ', '')),
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        emergency: document.getElementById('emergency').value,
        email: document.getElementById('email').value,
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
    .then(res => res.json())
    .then(data => {
        console.log(data);

        alert(" Order placed successfully!");

        localStorage.removeItem('luminaCart');

        window.location.href = "../index.html";
    })
    .catch(err => {
        console.error(err);
        alert("Failed to place order. Try again.");
    });
}

        // Initialize
        window.onload = function() {
            updateCartCount();
            renderCheckoutCart();
            populateTowns();
        };
   