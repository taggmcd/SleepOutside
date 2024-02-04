import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const difference = product.SuggestedRetailPrice - product.FinalPrice;
  
  return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
        <p class="product-card_discount">$${difference.toFixed(2)} off</p>
      </a>
    </li>`
    
  }
export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      }

      async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        const capitalizedCategory = this.category.split("-").map(value => value[0].toUpperCase() + value.slice(1)).join(" ")
        document.querySelector(".title").innerHTML = "Top Products: " + capitalizedCategory;
        
      
      }

      renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend");
      }
}

