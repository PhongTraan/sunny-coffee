const id = new URLSearchParams(location.search).get("id");

let quantity = 1;

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    const product = products.find((p) => p.id == id);

    document.getElementById("productDetail").innerHTML = `

<div class="detail-wrapper">

<div class="image-box">

<img id="mainImage" src="${product.image}">

<div class="thumb-list">

<img src="${product.image}" onclick="changeImage(this.src)">

<img src="${product.image}" onclick="changeImage(this.src)">

<img src="${product.image}" onclick="changeImage(this.src)">

<img src="${product.image}" onclick="changeImage(this.src)">

</div>

</div>

<div>


<h1 class="product-title">

${product.name}

</h1>

<p class="description">

${product.description}

</p>

<div class="price">

${product.price.toLocaleString("vi-VN")} đ

</div>

<div class="qty-box">

<button onclick="minus()">-</button>

<div class="qty" id="qty">1</div>

<button onclick="plus()">+</button>

</div>

<button class="cart-btn"

onclick="addToCart(${product.id})">

🛒 Thêm vào giỏ hàng

</button>

<div class="info">


<p><b>Vận chuyển:</b> Giao trong ngày</p>

<p><b>Thanh toán:</b> COD / Chuyển khoản</p>

</div>

</div>

</div>

`;
  });

function plus() {
  quantity++;

  document.getElementById("qty").innerHTML = quantity;
}

function minus() {
  if (quantity > 1) {
    quantity--;

    document.getElementById("qty").innerHTML = quantity;
  }
}

function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((i) => i.id === id);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({
      id: id,

      quantity: quantity,
    });
  }

  // localStorage.setItem("cart", JSON.stringify(cart));

  // alert("Đã thêm vào giỏ hàng");
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Đã thêm vào giỏ hàng",
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
  });
}
