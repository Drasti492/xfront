//  CART 
let cart = JSON.parse(localStorage.getItem('luminaCart')) || [];

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (!el) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    el.textContent = total;
}

function addToCart(name, price, image) {
    let existing = cart.find(i => i.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    localStorage.setItem('luminaCart', JSON.stringify(cart));
    updateCartCount();

    const btn = event.currentTarget;
    btn.textContent = " ADDED";

    setTimeout(() => {
        btn.textContent = "ADD TO CART";
    }, 1200);
}

function createCategoryBar() {

    // Detect  location
    const isInPages = window.location.pathname.includes('/pages/');
    const base = isInPages ? './' : './pages/';

    const categories = [
       
        {name: "Dildos", link: base + "dildos.html"},
        {name: "Male Toys", link: base + "maletoys.html"},
        {name: "Anal Plugs", link: base + "analplugs.html"},
        {name: "BDSM & Kegel", link: base + "bdsm.html"},
        {name: "Lubes & Condoms", link: base + "lubesandcondoms.html"},
        {name: "Adult Games", link: base + "adultgames.html"},
        {name: "Rose Vibrators", link: base + "rosevibrators.html"}
    ];

    let html = `
    <div class="category-bar">
        <div class="category-container">
    `;

    categories.forEach(cat => {
        html += `<a href="${cat.link}" class="category-item">${cat.name}</a>`;
    });

    html += `</div></div>`;

    const navbar = document.getElementById('navbar');
    if (navbar) navbar.insertAdjacentHTML('afterend', html);
}



// HAMBURGER 
const hamburger = document.getElementById('hamburger');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        let menu = document.getElementById('mobile-menu');

        if (!menu) {
            menu = document.createElement('div');
            menu.id = "mobile-menu";
            menu.className = "bg-white border-t p-6 flex flex-col gap-4 text-lg";

            menu.innerHTML = `
                <a href="../index.html">Home</a>
                <a href="her.html">For Her</a>
                <a href="him.html">For Him</a>
                <a href="cart.html">Cart</a>
            `;

            document.getElementById('navbar').appendChild(menu);
        } else {
            menu.remove();
        }
    });
}

// INIT 
window.addEventListener('load', () => {
    updateCartCount();
    createCategoryBar();
    initAgeGate(); 
    initSearch(); 
});``

//  AGE GATE 
function initAgeGate() {
    const gate = document.getElementById("age-gate");
    const checkbox = document.getElementById("age-check");
    const button = document.getElementById("continue-btn");

    if (!gate) return;

    // if already verified
    const verified = localStorage.getItem("luminaAgeVerified");

    if (verified === "true") {
        gate.style.display = "none";
        return;
    }

    //  button Enable when checked
    checkbox.addEventListener("change", () => {
        button.disabled = !checkbox.checked;
    });

    // On continue
    button.addEventListener("click", () => {
        localStorage.setItem("luminaAgeVerified", "true");

        gate.style.opacity = "0";
        setTimeout(() => {
            gate.style.display = "none";
        }, 300);
    });
}

// SEARCH TOGGLE 
function initSearch() {
    const toggle = document.getElementById('search-toggle');
    const bar = document.getElementById('search-bar');

    if (!toggle || !bar) return;

    toggle.addEventListener('click', () => {
        bar.classList.toggle('hidden');
    });
}