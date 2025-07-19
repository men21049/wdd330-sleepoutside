import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("products");

const productDtl = new ProductDetails(productID, dataSource);
productDtl.init();

/*function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart");
  // check if product already exists in cart
  const existingProduct = cartItems.find((item) => item.Id === product.Id);
  if (existingProduct) {
    // if it exists, do not add again
    return;
  } else {
    // if it does not exist, add to cart
    cartItems.push(product);
  }
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);*/
