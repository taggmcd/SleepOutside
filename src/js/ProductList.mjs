import { renderListWithTemplate} from "./utils.mjs";
function productCardTemplate(product) {
  const discount = product.SuggestedRetailPrice - product.FinalPrice;
  return `<li class="product-card">
      <a href="product_pages/index.html?product= ${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card__discount">-$${discount.toFixed(0)} off!</p>
      </a>
    </li>`
  }
  function filterProducts(list) {
    return list.slice(0,4);
  }

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      }
      async init() {
        const list = await this.dataSource.getData();
        this.renderList(filterProducts(list));
      }
      renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
      }
}