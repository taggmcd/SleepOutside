import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("product"); //"product" NOT category
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductListing(category, dataSource, listElement);
// finally call the init method to show our products
myList.init();

const listingTitle = document.querySelector("h2");
const capitalizedCategory = category.split("-").map(value => value[0].toUpperCase() + value.slice(1)).join(" ")
listingTitle.insertAdjacentHTML("beforeEnd", `: ${capitalizedCategory}`);

loadHeaderFooter();