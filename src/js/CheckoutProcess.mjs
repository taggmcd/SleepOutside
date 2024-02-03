import { getLocalStorage, setLocalStorage, removeAllAlerts, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
// convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
        };
    });
    return simplifiedItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};

    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.subtotal = 0;
        this.list = []
    }

    init() {
        this.list = getLocalStorage(this.key)
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items
        this.list.forEach(item => {
            this.subtotal += item.quantity * item.FinalPrice;
            this.itemTotal += item.quantity;
        });
        this.calculateOrdertotal()
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.subtotal * .06;
        this.shipping = 10 + (this.itemTotal-1)*2;
        this.orderTotal = this.subtotal + this.tax + this.shipping;
        // display the totals.
        this.displayOrderTotals();
      }

    displayOrderTotals() {
      const elem = this.renderOrderSummary()
      document.querySelector(this.outputSelector).innerHTML = elem
    }

    renderOrderSummary() {
        const newItem = `<p>Subtotal: $${this.subtotal.toFixed(2)}</p>
        <p>Shipping Estimate: $${this.shipping.toFixed(2)}</p>
        <p>Tax: $${this.tax.toFixed(2)}</p>
        <p>Order Total: $${this.orderTotal.toFixed(2)}</p>`;

        return newItem;
    }

    async checkout() {
      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
      const formElement = document.forms["checkout"];

      const json = formDataToJSON(formElement);
      // add totals, and item details
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      console.log(json);
      try {
        const res = await services.checkout(json);
        setLocalStorage("so-cart", []);
        location.assign("/checkout/success.html");
        console.log(res);
      }
      catch (err) {
        removeAllAlerts();
        for (let message in err.message) {
          alertMessage(message);
      }
        console.log(err);
    }
  }
}