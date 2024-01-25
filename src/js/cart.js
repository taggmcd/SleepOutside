import { getLocalStorage, setLocalStorage, setClick } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

export function removeFromCart(event) {
  const productId = event.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");
  const newItems = cartItems.filter((item) => item.Id !== productId);

  setLocalStorage("so-cart", newItems);
  cart.renderCartContents();
}

loadHeaderFooter();