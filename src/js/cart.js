// import { getLocalStorage, setLocalStorage, setClick } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

loadHeaderFooter();

