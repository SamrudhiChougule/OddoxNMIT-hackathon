let allProducts = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/api/products");
        allProducts = await res.json();
        renderProducts(allProducts);
        renderWishlist();
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

function renderProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image_url}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><b>₹${p.price}</b></p>
      <span class="eco-badge">🌱 Saved ${Math.round(p.price/10)}kg CO₂</span>
      <br><button onclick="addToWishlist(${p.id})">❤️ Save</button>
    </div>
  `).join("");
}

function filterProducts(category) {
    if (category === "all") {
        renderProducts(allProducts);
    } else {
        renderProducts(allProducts.filter(p => p.category === category));
    }
}

function addToWishlist(id) {
    const product = allProducts.find(p => p.id === id);
    if (!wishlist.some(p => p.id === id)) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
    }
}

function renderWishlist() {
    const container = document.getElementById("wishlist-list");
    container.innerHTML = wishlist.map(p => `
    <div class="product-card">
      <img src="${p.image_url}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><b>₹${p.price}</b></p>
    </div>
  `).join("");
}

/* Theme Toggle */
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

loadProducts();