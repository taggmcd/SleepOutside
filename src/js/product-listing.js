import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();
const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const listing = new ProductList(category, dataSource, listElement);
listing.init();