import { getLocalStorage, setLocalStorage, setClick } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    setClick(".cart-card__remove-btn", removeFromCart)
  } else {
    document.querySelector(".product-list").innerHTML =
      "Your cart is currently empty";
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove-btn"> <img data-id="${item.Id}" src="/images/remove-icon.svg"/> </span>
</li>`;

  return newItem;
}

function removeFromCart (event){
  const productId = event.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");
  const newItems = cartItems.filter( (item) => {return item.Id !== productId})

  setLocalStorage("so-cart", newItems);
  renderCartContents();
}

renderCartContents();
