import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // get cuurent products in cart
  let products = getLocalStorage("so-cart");

  // confirm if cart is empty
  if (products) {
    let newProductList = products.concat(product);
    setLocalStorage("so-cart", newProductList);
  } else {
    /**
     * so-cart was empty
     * initialize with new/first product added
     * should be an array
     * */
    setLocalStorage("so-cart", Array(product));
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
