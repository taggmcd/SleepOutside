import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
let product = new ProductData("tents");
let listing = new ProductListing("tents", product, listElement);
listing.init();

loadHeaderFooter();
