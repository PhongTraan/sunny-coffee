const params = new URLSearchParams(location.search);

const category = params.get("category");

fetch("data/products.json")
  .then((res) => res.json())

  .then((products) => {
    const filtered = products.filter((p) => p.category === category);

    let html = "";
    filtered.forEach((product) => {
      html += `

    <div class="product-card">

    <img src="${product.image}">

    <div class="product-content">

    <h3>${product.name}</h3>

    <p>${product.description}</p>

    <div class="price">

    ${product.price.toLocaleString("vi-VN")} đ

    </div>

    <a href="product-detail.html?id=${product.id}" class="detail-btn">

    Xem chi tiết

    </a>

    </div>

    </div>

    `;
    });

    document.getElementById("products").innerHTML = html;
  });
