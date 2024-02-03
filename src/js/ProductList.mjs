import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
      <button id="${product.Id}" class="preview">Quick View</button>
    </li>`;
}

function productQuickTemplate(product) {
  return `<div class="quick-data">
  <span id="close">&times;</span>
  <h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.NameWithoutBrand}"
  />
  <p class="product__color">Color: ${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
    </div>`;
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
    const capitalizedCategory = this.category
      .split("-")
      .map((value) => value[0].toUpperCase() + value.slice(1))
      .join(" ");
    document.querySelector(".title").innerHTML =
      "Top Products: " + capitalizedCategory;
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "beforeend"
    );

    // Quick view modal goodness
    const itemElements = document.getElementsByClassName("preview");
    function renderQuickModal(itemId, itemList) {
      const product = itemList.filter((item) => item.Id === itemId);
      let modal = document.getElementById("quick-view");

      modal.classList.toggle("hide");
      renderWithTemplate(
        modal,
        productQuickTemplate(product[0]),
        "afterbegin",
        true
      );
      const modalClose = document.getElementById("close");

      modalClose.addEventListener("click", function () {
        modal.classList.toggle("hide");
      });
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.classList.toggle("hide");
        }
      };
    }

    Array.from(itemElements).forEach((element) => {
      element.addEventListener("click", function (e) {
        renderQuickModal(e.target.id, list);
      });
    });
  }
}
