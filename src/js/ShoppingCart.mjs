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
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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

    // Original rendering solution
    //   renderList(list) {
    //     const elementList = list.map(productCardTemplate);
    //     this.listElement.innerHTML = elementList.join("");
    //   }