import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

const sortSelect = document.getElementById("sortOptions");

// Parse price text to float
function extractPrice(priceText) {
  return parseFloat(priceText.replace(/[^\d.]/g, ""));
}

// Get product cards
function getProductCards() {
  return Array.from(document.querySelectorAll(".product-card"));
}

// Sort function
function sortProducts(sortValue) {
  const cards = getProductCards();
  let sorted;

  switch (sortValue) {
    case "name-asc":
      sorted = cards.sort((a, b) =>
        a
          .querySelector("h3")
          .textContent.localeCompare(b.querySelector("h3").textContent),
      );
      break;
    case "name-desc":
      sorted = cards.sort((a, b) =>
        b
          .querySelector("h3")
          .textContent.localeCompare(a.querySelector("h3").textContent),
      );
      break;
    case "price-asc":
      sorted = cards.sort(
        (a, b) =>
          extractPrice(a.querySelector(".product-card__price").textContent) -
          extractPrice(b.querySelector(".product-card__price").textContent),
      );
      break;
    case "price-desc":
      sorted = cards.sort(
        (a, b) =>
          extractPrice(b.querySelector(".product-card__price").textContent) -
          extractPrice(a.querySelector(".product-card__price").textContent),
      );
      break;
  }

  // Animate re-rendering
  element.innerHTML = ""; // Clear current
  sorted.forEach((card, i) => {
    card.classList.add("entering");
    element.appendChild(card);
    setTimeout(() => card.classList.add("entered"), i * 50);
  });

  localStorage.setItem("sortPreference", sortValue);
}

// Restore sort preference
function restoreSort() {
  const savedSort = localStorage.getItem("sortPreference");
  if (savedSort) {
    sortSelect.value = savedSort;
    sortProducts(savedSort);
  }
}

// Event Listener
sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  restoreSort();
});
