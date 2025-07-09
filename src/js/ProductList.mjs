import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.log(`${product.Name}`);

  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

class ProductList {
  constructor(category, datasource, listElement) {
    this.category = category;
    this.dataSource = datasource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    //const htmlStrings = list.map(productCardTemplate);
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
export default ProductList;
