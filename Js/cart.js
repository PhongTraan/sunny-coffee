const cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    let html = "";

    let total = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);

      const subTotal = product.price * item.quantity;

      total += subTotal;
      html += `
        <div class="cart-item">

        <img src="${product.image}" class="cart-image">

        <div class="cart-info">

        <h3>${product.name}</h3>

        <p class="price">
        Đơn giá:
        ${product.price.toLocaleString("vi-VN")} đ
        </p>

        <div class="qty">

        <button onclick="changeQuantity(${product.id},-1)">−</button>

        <span>${item.quantity}</span>

        <button onclick="changeQuantity(${product.id},1)">+</button>

        </div>

        <p class="subtotal">

        ${subTotal.toLocaleString("vi-VN")} đ

        </p>

        </div>

        <button class="delete-btn"

        onclick="removeItem(${product.id})">

        🗑 Xóa

        </button>

        </div>
        `;
    });

    if (cart.length === 0) {
      html = `
      <div style="

      background:white;

      padding:80px;

      border-radius:15px;

      text-align:center;

      box-shadow:0 5px 15px rgba(0,0,0,.08);

      ">

      <h2>🛒 Giỏ hàng đang trống</h2>

      <br>

      <a href="products.html"

      style="

      display:inline-block;

      padding:15px 30px;

      background:#1b5e20;

      color:white;

      text-decoration:none;

      border-radius:10px;

      ">

      Tiếp tục mua sắm

      </a>

      </div>

      `;
    }

    document.getElementById("cartItems").innerHTML = html;

    // document.getElementById("total").innerHTML = "Total: $" + total.toFixed(2);
    document.getElementById("total").innerHTML =
      "Tổng tiền: " + total.toLocaleString("vi-VN") + " đ";
  });

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Giỏ hàng đang trống");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: Date.now(),
    status: "Đang xử lý",
    date: new Date().toLocaleString("vi-VN"),
    items: cart,
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  alert("Đặt hàng thành công");

  location.href = "orders.html";
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}

function changeQuantity(id, value) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((p) => p.id === id);

  if (item) {
    item.quantity += value;

    if (item.quantity <= 0) {
      cart = cart.filter((p) => p.id !== id);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}
