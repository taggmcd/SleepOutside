import ProductData from "./ProductData.mjs"
import ProductListing from "./ProductList.mjs"

const listElement = document.querySelector(".product-list")
let product = new ProductData("tents");
let listing = new ProductListing("tents, product, listElement");
await listing.init()