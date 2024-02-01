import { getLocalStorage } from "./utils.mjs"
import { displayTotal } from "./ShoppingCart.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.list = []
    }

    init() {
        this.list = getLocalStorage(this.key)
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items
        this.list.forEach(item => {
            this.orderTotal += item.quantity * item.FinalPrice;
            this.itemTotal += item.quantity;
        });
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.orderTotal * .06;
        this.shipping = 10 + (this.itemTotal-1)*2;
        this.orderTotal = this.orderTotal + this.tax + this.shipping;
        // display the totals.
        this.displayOrderTotals();
      }
    
    displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.getElementById("summary").insertAdjacentElement("afterbegin", renderOrderSummary());
    }

    renderOrderSummary() {
        const newItem = `<p>Subtotal: $${displayTotal().toFixed(2)}</p>
        <p>Shipping Estimate: $${this.shipping.toFixed(2)}</p>
        <p>Tax: $${this.tax.toFixed(2)}</p>
        <p>Order Total: $${this.orderTotal.toFixed(2)}</p>`;

        return newItem;
    }
}