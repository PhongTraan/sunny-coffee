let allProducts = [];

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;
    renderProducts(products);
    const categories = {};

    products.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = {
          name: product.categoryName,
          products: [],
        };
      }

      categories[product.category].products.push(product);
    });

    let html = "";

    Object.keys(categories).forEach((category) => {
      const data = categories[category];

      html += `
        <section class="category-section">

          <div class="category-banner">

            <div>
              <h2>${data.name}</h2>

              <p>
                Khám phá các sản phẩm ${data.name}
              </p>
            </div>

            <a
              href="category.html?category=${category}"
              class="view-all-btn"
            >
              Xem tất cả
            </a>

          </div>

          <div class="product-grid">
      `;

      data.products.slice(0, 8).forEach((product) => {
        html += `

      <div class="product-card">

      <img src="${product.image}" alt="${product.name}">

      <div class="product-content">

      <h3>${product.name}</h3>

      <p>${product.description}</p>

      <div class="price">

      ${product.price.toLocaleString("vi-VN")} đ

      </div>

      <a
      href="product-detail.html?id=${product.id}"
      class="detail-btn">

      Xem chi tiết

      </a>

      </div>

      </div>

      `;
      });

      html += `
          </div>
        </section>
      `;
    });

    document.getElementById("categoriesContainer").innerHTML = html;
  });

function renderProducts(products) {
  const categories = {};

  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = {
        name: product.categoryName,
        products: [],
      };
    }

    categories[product.category].products.push(product);
  });

  let html = "";

  Object.keys(categories).forEach((category) => {
    const data = categories[category];

    html += `
      <section class="category-section">

        <div class="category-banner">

          <div>

            <h2>${data.name}</h2>

            <p>Khám phá các sản phẩm ${data.name}</p>

          </div>

          <a
            href="category.html?category=${category}"
            class="view-all-btn">

            Xem tất cả

          </a>

        </div>

        <div class="product-grid">
    `;

    data.products.forEach((product) => {
      html += `
        <div class="product-card"
          data-name="${product.name.toLowerCase()}">

          <img src="${product.image}" alt="${product.name}">

          <div class="product-content">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="price">

              ${product.price.toLocaleString("vi-VN")} đ

            </div>

            <a
              href="product-detail.html?id=${product.id}"
              class="detail-btn">

              Xem chi tiết

            </a>

          </div>

        </div>
      `;
    });

    html += `
        </div>

      </section>
    `;
  });

  document.getElementById("categoriesContainer").innerHTML = html;
}

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();

  const filtered = allProducts.filter((product) =>
    product.name.toLowerCase().includes(keyword),
  );

  renderProducts(filtered);
});
