import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices("tents");


const product = new ProductDetails(productId, dataSource);
product.init();
loadHeaderFooter();