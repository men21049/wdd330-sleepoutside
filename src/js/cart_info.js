function updateCartBadge() {
  const cart = localStorage.getItem("so-cart");
  const cartItems = cart ? JSON.parse(cart) : [];
  const badge = document.getElementById("cartBadge");
  const totalItems = cartItems.length;

  if (totalItems > 0 && cartItems) {
    badge.textContent = totalItems > 99 ? "99+" : totalItems;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

updateCartBadge();
