import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    addToCart() {
        let cart = getLocalStorage("so-cart");
        if (cart === null) {
          cart = []; // initialize cart as array
        }

        const productIds = cart.map(product => product.Id) // list of Ids in the cart
        const index = productIds.indexOf(this.productId) // finds Id of current product

        if (index == -1) { // check to see if product is not in cart
          this.product.quantity = 1;
          cart.push(this.product); // add product to cart
        }
        else {
          cart[index].quantity += 1; // add 1 to quantity of item already in cart
        }

        setLocalStorage("so-cart", cart);
    }

   async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }
}