import { renderListWithTemplate } from "./utils.mjs"

function productCardTemplate(product) {
    return `
        <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Image}">
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.Name}</h2>
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
        </li>`
}

function filterProductsList(list) {
    return list.slice(0,4);
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    //  use the dataSource to get the list of products to work with. 
    //  We could do that in the constructor or in an init() method. 
    //  One advantage of the init method is that it will allow us to use async/await when calling the promise in getData().
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(filterProductsList(list));
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);

        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
}