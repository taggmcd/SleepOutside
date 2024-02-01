// import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs"
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
// const dataSource = new ProductData();
const dataSource = new ExternalServices(category);
const listElement = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, listElement);
listing.init();
