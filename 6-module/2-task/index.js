import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  elem = null;

  constructor(product) {
    this.name = product.name;
    this.price = '€' + product.price.toFixed(2);
    this.category = product.category;
    this.image = product.image;
    this.productId = product.id;
    this.elem = this.#render();
  }

  #render() {
    const card = createElement(`
      <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
            <span class="card__price">${this.price}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>
    `)

    const addButton = card.querySelector('.card__button');
    addButton.addEventListener('click', () => {
      this.#productAddEvent();
    })

    return card;
  }

  #productAddEvent() {
    let productAdd = new CustomEvent("product-add", {
      detail: this.productId,
      bubbles: true
    })

    this.elem.dispatchEvent(productAdd);
  }
}