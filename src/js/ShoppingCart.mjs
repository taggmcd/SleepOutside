import { getLocalStorage, setClick, setLocalStorage } from "./utils.mjs";

export default class shoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    if (!cartItems || cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML =
        "Your cart is currently empty";
    } else if (cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      setClick(".cart-card__remove-btn", this.removeFromCart.bind(this));
      displayTotal(cartItems);
    }
  }
  removeFromCart(event) {
    const productId = event.target.getAttribute("data-id");
    const cartItems = getLocalStorage("so-cart");
    const newItems = cartItems.filter((item) => item.Id !== productId);

    setLocalStorage("so-cart", newItems);
    this.renderCartContents();
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <img class="cart-card__remove-btn" data-id="${item.Id}" src="/images/remove-icon.svg"/>
</li>`;

  return newItem;
}

export function displayTotal(cartItems) {
 //this will pull as a parameter for the function
    const cartFooter = document.querySelector(".cart-footer");
    if (cartItems.length > 0) {
      let total = 0;
        //Calculate total
      cartItems.forEach(item => {
      total += item.FinalPrice * item.quantity;
      });
    
    const totalElement = document.querySelector(".totalAmount");
    totalElement.textContent = `$${total.toFixed(2)}`;
    //totalElement = (cartFooter + cartItems).toFixed(2);
    cartFooter.classList.remove("hide");
    }
    else {
      cartFooter.classList.add("hide");
    }
    return total;
      }
   //Display the total in the cart footer
