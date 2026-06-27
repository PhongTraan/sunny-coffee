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

        <div class="status ${order.status === "Hoàn thành" ? "completed" : ""}">
            ${order.status}
        </div>

    </div>

    <div class="order-actions">

        ${
          order.status !== "Hoàn thành"
            ? `
            <button
                class="complete-btn"
                onclick="completeOrder(${order.id})">
                Hoàn thành
            </button>
            `
            : ""
        }

        <button
            class="delete-order-btn"
            onclick="deleteOrder(${order.id})">
            Xóa
        </button>

    </div>

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

// function deleteOrder(id) {
//   let orders = JSON.parse(localStorage.getItem("orders")) || [];

//   orders = orders.filter((order) => order.id !== id);

//   localStorage.setItem("orders", JSON.stringify(orders));

//   location.reload();
// }

function deleteOrder(id) {
  Swal.fire({
    title: "Xóa Đơn Hàng?",
    text: "Bạn có chắc muốn xóa đơn hàng này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1b5e20",
  }).then((result) => {
    if (result.isConfirmed) {
      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders = orders.filter((order) => order.id !== id);
      localStorage.setItem("orders", JSON.stringify(orders));
      Swal.fire({
        toast: true,
        icon: "success",
        position: "top-end",
        title: "Xoá Thành Công",
        text: "Đơn hàng đã được xoá",
        timer: 300,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        location.reload();
      });
    }
  });
}

function completeOrder(id) {
  Swal.fire({
    title: "Hoàn thành đơn hàng?",
    text: "Xác nhận đơn hàng đã hoàn thành.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Hoàn thành",
    cancelButtonText: "Hủy",
    confirmButtonColor: "#2e7d32",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      let orders = JSON.parse(localStorage.getItem("orders")) || [];

      const order = orders.find((o) => o.id === id);

      if (order) {
        order.status = "Hoàn thành";
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      Swal.fire({
        toast: true,
        icon: "success",
        position: "top-end",
        title: "Đã cập nhật",
        text: "Đơn hàng đã hoàn thành.",
        timer: 800,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        location.reload();
      });
    }
  });
}
