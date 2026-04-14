
const countiesData = {
    "Nairobi": ["Nairobi CBD", "Westlands", "Kilimani", "Lavington", "South C", "Eastleigh", "Kasarani", "Langata", "Embakasi", "Ruaraka", "Dagoretti", "Karen"],
    
    "Kiambu": ["Thika", "Ruiru", "Kiambu Town", "Limuru", "Kikuyu", "Githunguri", "Karuri", "Juja", "Kabete", "Gatundu"],
    
    "Nakuru": ["Nakuru Town", "Naivasha", "Gilgil", "Njoro", "Molo", "Subukia", "Elementaita", "Kuresoi"],
    
    "Kisumu": ["Kisumu CBD", "Kondele", "Nyakach", "Maseno", "Ahero", "Muhoroni"],
    
    "Mombasa": ["Mombasa Island", "Nyali", "Likoni", "Bamburi", "Changamwe", "Jomvu", "Kisauni"],
    
    "Uasin Gishu": ["Eldoret CBD", "Kitale", "Turbo", "Soy", "Burnt Forest", "Moiben"],
    
    "Nandi": ["Kapsabet", "Nandi Hills", "Tinderet", "Mosoriot", "Chemelil", "Chesumei"],
    
    "Kericho": ["Kericho Town", "Litein", "Kapkatet", "Kipkelion", "Sigowet", "Londiani"],
    
    "Bomet": ["Bomet Town", "Sotik", "Longisa", "Chepalungu", "Konoin"],
    
    "Kakamega": ["Kakamega Town", "Mumias", "Butere", "Shinyalu", "Malava", "Lurambi"],
    
    "Bungoma": ["Bungoma Town", "Webuye", "Kimilili", "Chwele", "Sirisia", "Tongaren"],
    
    "Busia": ["Busia Town", "Malaba", "Port Victoria", "Budalangi", "Nambale"],
    
    "Nyeri": ["Nyeri Town", "Nyahururu", "Othaya", "Karatina", "Mukurweini"],
    
    "Meru": ["Meru Town", "Nkubu", "Maua", "Chuka", "Migori", "Timau"],
    
    "Machakos": ["Machakos Town", "Mlolongo", "Athi River", "Kangundo", "Matuu", "Tala"],
    
    "Kajiado": ["Kajiado Town", "Ngong", "Kitengela", "Ongata Rongai", "Kiserian", "Loitokitok"],
    
    "Kilifi": ["Kilifi Town", "Malindi", "Watamu", "Mtwapa", "Mariakani", "Kilifi North"],
    
    "Kwale": ["Kwale Town", "Ukunda", "Diani", "Msambweni", "Lunga Lunga"],

    // === Remaining 29 Counties (Added with major towns / headquarters) ===

    "Tana River": ["Hola", "Garsen", "Bura", "Madogo"],
    
    "Lamu": ["Lamu Town", "Mpeketoni", "Witu", "Kiunga"],
    
    "Taita Taveta": ["Voi", "Wundanyi", "Taveta", "Mwatate", "Maungu"],
    
    "Garissa": ["Garissa Town", "Dadaab", "Lagdera", "Hulugho"],
    
    "Wajir": ["Wajir Town", "Eldas", "Tarbaj", "Habaswein"],
    
    "Mandera": ["Mandera Town", "El Wak", "Rhamu", "Lafey"],
    
    "Marsabit": ["Marsabit Town", "Moyale", "Sololo", "Loiyangalani"],
    
    "Isiolo": ["Isiolo Town", "Garbatulla", "Merti", "Meru (border areas)"],
    
    "Tharaka Nithi": ["Chuka", "Kathwana", "Marimanti", "Kigumo"],
    
    "Embu": ["Embu Town", "Siakago", "Runyenjes", "Manyatta"],
    
    "Kitui": ["Kitui Town", "Mwingi", "Mutomo", "Zombe", "Mui"],
    
    "Makueni": ["Wote", "Makindu", "Mtito Andei", "Sultan Hamud", "Emali"],
    
    "Nyandarua": ["Ol Kalau", "Nyahururu", "Engineer", "Ndaragwa", "Kinangop"],
    
    "Kirinyaga": ["Kerugoya", "Kutus", "Wanguru", "Sagana"],
    
    "Murang'a": ["Murang'a Town", "Kangema", "Kahuro", "Kenol", "Maragua"],
    
    "Laikipia": ["Nanyuki", "Rumuruti", "Nyahururu", "Doldol", "Timau"],
    
    "Narok": ["Narok Town", "Kilgoris", "Mulot", "Sotik (border)", "Mau Narok"],
    
    "Kajiado": ["Kajiado Town", "Ngong", "Kitengela", "Ongata Rongai", "Kiserian", "Loitokitok"], // already had, kept consistent
    
    "Trans Nzoia": ["Kitale", "Endebess", "Kiminini", "Saboti"],
    
    "Elgeyo Marakwet": ["Iten", "Kapsowar", "Chepkorio", "Marakwet"],
    
    "West Pokot": ["Kapenguria", "Chepareria", "Sigor", "Alale"],
    
    "Samburu": ["Maralal", "Wamba", "Isiolo (border)", "Baragoi"],
    
    "Turkana": ["Lodwar", "Lokichar", "Kakuma", "Lokitaung", "Kalokol"],
    
    "Baringo": ["Kabarnet", "Marigat", "Kogelo", "Chemolingot", "Mogotio"],
    
    "Vihiga": ["Mbale", "Luanda", "Chavakali", "Emuhaya"],
    
    "Siaya": ["Siaya Town", "Bondo", "Ugunja", "Ukwala", "Yala"],
    
    "Homa Bay": ["Homa Bay Town", "Mbita", "Oyugis", "Kendu Bay", "Rongo (border)"],
    
    "Migori": ["Migori Town", "Awendo", "Isebania", "Rongo", "Kebera"],
    
    "Kisii": ["Kisii Town", "Nyamache", "Keroka", "Ogembo", "Suneka"],
    
    "Nyamira": ["Nyamira Town", "Keroka", "Manga", "Ekerenyo"]
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

function showModal(type) {
    const modal = document.getElementById("paymentModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.querySelectorAll(".state").forEach(s => s.classList.add("hidden"));

    document.querySelector(`.${type}`).classList.remove("hidden");
}

function closeModal() {
    document.getElementById("paymentModal").classList.add("hidden");
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

    const amount = parseInt(
        document.getElementById('checkout-total')
        .textContent.replace('KSh ', '')
    );

    // SHOW LOADING
    showModal("loading-state");

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

                        showModal("success-state");

                        saveOrder();

                    } else if (statusData.status === "failed") {
                        clearInterval(poll);

                        showModal("error-state");

                    } else if (attempts > 30) {
                        clearInterval(poll);

                        showModal("error-state");
                    }
                });

        }, 3000);

    })
    .catch(err => {
        console.error(err);
        showModal("error-state");
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
   