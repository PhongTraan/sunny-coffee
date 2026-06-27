let productsData = [];

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    productsData = products;
    renderCart();
  });

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let html = "";
  let total = 0;

  cart.forEach((item) => {
    const product = productsData.find((p) => p.id === item.id);

    if (!product) return;

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
          <h2>Giỏ hàng đang trống</h2>
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

  document.getElementById("total").innerHTML =
    "Tổng tiền: " + total.toLocaleString("vi-VN") + " đ";

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Giỏ hàng trống",
      text: "Vui lòng thêm sản phẩm trước khi thanh toán.",
      confirmButtonColor: "#1b5e20",
    });

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

  Swal.fire({
    icon: "success",
    title: "Đặt hàng thành công ",
    text: "Cảm ơn bạn đã mua hàng tại Sunny Coffee!",
    confirmButtonColor: "#1b5e20",
    fontSize: "10px",
  }).then(() => {
    location.href = "orders.html";
  });
}

function removeItem(id) {
  Swal.fire({
    title: "Xoá Sản Phẩm?",
    html: `
      <p style="font-size:16px;color:#666;">
        Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?
      </p>
    `,
    // icon: "question",
    showCancelButton: true,
    confirmButtonText: "Xoá",
    cancelButtonText: "Giữ Lại ",
    reverseButtons: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1b5e20",
    background: "#fff",
    borderRadius: "18px",
    width: "430px",
  }).then((result) => {
    if (!result.isConfirmed) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Đã xóa sản phẩm",
      timer: 1000,
      showConfirmButton: false,
    });
  });
}

function changeQuantity(id, value) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((i) => i.id === id);

  if (!item) return;

  item.quantity += value;

  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}
