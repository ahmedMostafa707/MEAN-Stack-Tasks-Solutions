let products = [];
let filteredProducts = [];
let cart = [];
let currentPage = 1;
const productsPerPage = 4;

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = await response.json();
  filteredProducts = [...products];
  createCategories();
  displayProducts();
  displayPagination();
}

function createCategories() {
  const categories = [...new Set(products.map((product) => product.category))];

  const categorySelect = document.getElementById("category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    categorySelect.appendChild(option);
  });
}

function displayProducts() {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  filteredProducts.slice(startIndex, endIndex).forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
          `;
    productsContainer.appendChild(productDiv);
  });
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.onclick = () => {
      currentPage = i;
      displayProducts();
    };
    pagination.appendChild(button);
  }
}

function applyFilters() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("min-price").value;
  const maxPrice = document.getElementById("max-price").value;

  filteredProducts = products.filter((product) => {
    return (
      (!search || product.title.toLowerCase().includes(search)) &&
      (!category || product.category === category) &&
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice)
    );
  });
  currentPage = 1;
  displayProducts();
  displayPagination();
}

function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  const cartItem = cart.find((item) => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
          <span> ${item.product.title} - $${item.product.price}</span>
          <span> ${item.quantity}</span>
          <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;
    cartItems.appendChild(cartItemDiv);
    totalQuantity += item.quantity;
    totalPrice += item.product.price * item.quantity;
  });
  document.getElementById("total-quantity").innerText = totalQuantity;
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex((item) => item.product.id === productId);
  cart[cartItemIndex].quantity -= 1;

  if (cart[cartItemIndex].quantity === 0) {
    cart.splice(cartItemIndex, 1);
  }
  updateCart();
}

fetchProducts();
