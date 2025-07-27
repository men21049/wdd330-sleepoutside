import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.getSummary();
  }
  async getSubTotalFromCart() {
    const subTotal = this.list.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    return subTotal;
  }

  async getTax() {
    const subtotal = await this.getSubTotalFromCart();
    const tax = subtotal * 0.06;
    return tax;
  }

  async getShipping() {
    const shipping = 10 + (Object.keys(this.list).length - 1) * 2;
    return shipping;
  }

  async getTotal() {
    const total =
      (await this.getSubTotalFromCart()) +
      (await this.getTax()) +
      (await this.getShipping());
    return total;
  }

  async getITems() {
    const items = this.list.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    }));
    return items;
  }

  async getSummary() {
    const subtotal = document.querySelector(this.outputSelector + " #subTotal");
    const total = document.querySelector(this.outputSelector + " #total");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const itemNumElement = document.querySelector(
      this.outputSelector + " #numItems",
    );
    itemNumElement.innerText = this.list.length;
    subtotal.innerText = "$" + (await this.getSubTotalFromCart()).toFixed(2);
    tax.innerText = "$" + (await this.getTax()).toFixed(2);

    total.innerText =
      "$" +
      ((await this.getSubTotalFromCart()) + (await this.getTax())).toFixed(2);
  }

  async getOrderTotal() {
    const shipping = document.querySelector(this.outputSelector + " #ship");
    shipping.innerText = "$" + (await this.getShipping()).toFixed(2);
    const total = document.querySelector(this.outputSelector + " #total");
    total.innerText = "$" + (await this.getTotal()).toFixed(2);
  }
}
