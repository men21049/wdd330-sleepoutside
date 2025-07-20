import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const total = getTotalCostFromCart(cartItems);
  document.querySelector(".product-list-cart").innerHTML = htmlItems.join("");
  document.querySelector(".cart-total").textContent = `Total: $${total}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/?products=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}" alt="${item.Name}
    />
  </a>
  <a href="../product_pages/?products=${item.Id}">
    <h2 class="card__name">${item.Brand.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function getTotalCostFromCart(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.FinalPrice);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return total.toFixed(2);
}

renderCartContents();
