import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const listing = new ProductListing("Tents", dataSource, element);
const dataSource = new ProductData('tents');
const element = document.querySelector(".product-list");

listing.init();