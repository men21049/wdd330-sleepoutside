function updateCartBadge() {
  const cart = localStorage.getItem("so-cart");
  const cartItems = cart ? JSON.parse(cart) : [];
  const badge = document.getElementById("cartBadge");
  console.log("Cart items:", cartItems); // Debugging line to check cart items
  console.log("Total items:", cartItems.length); // Debugging line to check total items
  console.log("Badge element:", badge); // Debugging line to check badge element
  const totalItems = cartItems.length;

  if (totalItems > 0 && cartItems) {
    badge.textContent = totalItems > 99 ? "99+" : totalItems;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

updateCartBadge();
