import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParam('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();

// add product to cart by getting and setting LocalStorage
function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (cart === null) {
    cart = []; // initialize cart as array
  }
  cart.push(product); //add product to cart
  setLocalStorage("so-cart", cart);
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
