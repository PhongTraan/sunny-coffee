const orders = JSON.parse(localStorage.getItem("orders")) || [];

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    let html = "";

    if (orders.length === 0) {
      html = `
        <div class="empty-order">
          <h2>Chưa có đơn hàng nào</h2>
        </div>
      `;
    }

    [...orders].reverse().forEach((order) => {
      let total = 0;

      let itemsHTML = "";

      order.items.forEach((item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) return;

        const subtotal = product.price * item.quantity;

        total += subtotal;

        itemsHTML += `

        <div class="order-item">

        <img src="${product.image}">

        <div class="order-info">

        <h4>${product.name}</h4>

        <p>Đơn giá:
        ${product.price.toLocaleString("vi-VN")} đ</p>

        <p>Số lượng:
        ${item.quantity}</p>

        <p>Thành tiền:
        ${subtotal.toLocaleString("vi-VN")} đ</p>

        </div>

        </div>

        `;
      });

      html += `
        <div class="order-card">

        <div class="order-header">

        <div>

        <h2>Đơn hàng #${order.id}</h2>

        <p>${order.date}</p>

        <div class="status">

        ${order.status}

        </div>

        </div>

        <button

        class="delete-order-btn"

        onclick="deleteOrder(${order.id})">

        🗑 Xóa

        </button>

        </div>

        ${itemsHTML}

        <div class="order-total">

        Tổng thanh toán:
        ${total.toLocaleString("vi-VN")} đ

        </div>

        </div>

        `;
    });

    if (orders.length === 0) {
      html = `
      <div class="empty-order">
      <h2>📦 Bạn chưa có đơn hàng nào</h2>
      <br>
      <a href="products.html">
      Mua sắm ngay
      </a>
      </div>

      `;
    }

    document.getElementById("orders").innerHTML = html;
  });

function deleteOrder(id) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.filter((order) => order.id !== id);

  localStorage.setItem("orders", JSON.stringify(orders));

  location.reload();
}
