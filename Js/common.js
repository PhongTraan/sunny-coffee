function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = total;
    }
}

// Khi mở trang
document.addEventListener("DOMContentLoaded", updateCartCount);