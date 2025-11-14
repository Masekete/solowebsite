document.addEventListener('DOMContentLoaded', () => {
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
navMenu.classList.toggle('active');
// Optional: Toggle hamburger icon to 'X' (requires Font Awesome)
hamburger.querySelector('i').classList.toggle('fa-bars');
hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking outside (optional enhancement)
document.addEventListener('click', (event) => {
if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
navMenu.classList.remove('active');
hamburger.querySelector('i').classList.add('fa-bars');
hamburger.querySelector('i').classList.remove('fa-times');
}
});
});

/* ---------- Dropdown click toggle ---------- */
const shopToggle   = document.getElementById('shop-toggle');
const shopDropdown = document.getElementById('shop-dropdown');

shopToggle.addEventListener('click', (e) => {
  e.preventDefault();                 // stop navigation
  shopDropdown.classList.toggle('open');

  // Optional: rotate caret
  const caret = shopToggle.querySelector('.fa-caret-down');
  caret.classList.toggle('fa-caret-up');
});

/* Close dropdown when clicking outside */
document.addEventListener('click', (e) => {
  if (!shopToggle.contains(e.target) && !shopDropdown.contains(e.target)) {
    shopDropdown.classList.remove('open');
    const caret = shopToggle.querySelector('.fa-caret-down');
    if (caret) caret.classList.remove('fa-caret-up');
  }
});

/* On mobile: keep dropdown open when nav is active */
navMenu.addEventListener('click', (e) => {
  // If user clicks a top-level link (not inside dropdown), close dropdown
  if (navMenu.classList.contains('active') && 
      !shopToggle.contains(e.target) && 
      !shopDropdown.contains(e.target)) {
    shopDropdown.classList.remove('open');
  }
});


    // Product Data
    const products = [
      { name: "Air Zoom Red", price: "R1,299", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", sizes: ["7", "8", "9", "10", "11"] },
      { name: "Classic White Tee", price: "R399", img: "https://images.unsplash.com/photo-1524010349062-860def6b2f79?w=600", sizes: ["S", "M", "L", "XL"] },
      { name: "Slim Black Chinos", price: "R799", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600", sizes: ["30", "32", "34", "36"] },
      { name: "Vintage Denim", price: "R1,199", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600", sizes: ["S", "M", "L"] }
    ];

    let currentProduct = null;
    let quantity = 1;

    // Open Modal
    function openModal(index) {
      currentProduct = products[index];
      quantity = 1;

      document.getElementById("modalImg").src = currentProduct.img;
      document.getElementById("modalTitle").textContent = currentProduct.name;
      document.getElementById("modalPrice").textContent = currentProduct.price;
      document.getElementById("qtyInput").value = quantity;

      // Populate sizes
      const sizeContainer = document.getElementById("sizeOptions");
      sizeContainer.innerHTML = "";
      currentProduct.sizes.forEach((size, i) => {
        const btn = document.createElement("button");
        btn.className = "size-btn";
        btn.textContent = size;
        btn.onclick = (e) => {
          e.stopPropagation();
          document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
        };
        if (i === 0) btn.classList.add("selected");
        sizeContainer.appendChild(btn);
      });

      document.getElementById("quickViewModal").classList.add("active");
    }

    // Close Modal
    function closeModal() {
      document.getElementById("quickViewModal").classList.remove("active");
    }

    // Change Quantity
    function changeQty(change) {
      quantity = Math.max(1, quantity + change);
      document.getElementById("qtyInput").value = quantity;
    }

    // Add to Cart (Demo)
    function addToCart() {
      const selectedSize = document.querySelector(".size-btn.selected")?.textContent;
      if (!selectedSize) {
        alert("Please select a size!");
        return;
      }
      alert(`Added to cart: ${currentProduct.name} (Size: ${selectedSize}, Qty: ${quantity})`);
      closeModal();
    }

    // Close modal when clicking outside
    window.onclick = function(e) {
      const modal = document.getElementById("quickViewModal");
      if (e.target === modal) closeModal();
    };

    