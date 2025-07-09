const productData = require("./ProductData.mjs");
const ProductList = require("./ProductList.mjs");

const dataSource = new productData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
