import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

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

  async packageItems() {
    const items = this.list.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
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

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = (await this.getTotal()).toFixed(2);
    order.tax = (await this.getTax()).toFixed(2);
    order.shipping = (await this.getShipping()).toFixed(2);
    order.items = this.packageItems();
    console.log(order);

    try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}
