import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
    this.#scroller();
    this.#userEventListeners();
  }

  #render() {
    const slider = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
        ${this.categories.map(cat => `
          <a href="#" class="ribbon__item" data-id=${cat.id}>${cat.name}</a>
        `).join('')}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `)
    return slider;
  }

  #scroller() {
    const forwardButton = this.elem.querySelector('.ribbon__arrow_right');
    const backButton = this.elem.querySelector('.ribbon__arrow_left');
    const ribbon = this.elem.querySelector('.ribbon__inner');
    const scrollWidth = ribbon.scrollWidth;
    
    let currentScroll = ribbon.scrollX;

    forwardButton.addEventListener('click', () => {
      // currentScroll;
      ribbon.scrollBy(350, 0);
      console.log('currentScroll ' + ribbon.scrollLeft);
      console.log('scrollWidth ' + ribbon.scrollWidth);
      // backButton.classList = 'ribbon__arrow ribbon__arrow_left ribbon__arrow_visible';
    })

    backButton.addEventListener('click', () => {
      // currentScroll;
      ribbon.scrollBy(-350, 0);
      console.log('currentScroll ' + ribbon.scrollLeft);
      console.log('scrollWidth ' + ribbon.scrollWidth);
    })
  }

  #userEventListeners() {
    this.elem.addEventListener('click', event => {
        const clickedCategory = event.target.closest('.ribbon__item');
        if (clickedCategory) {
            const categoryId = clickedCategory.dataset.id;
            this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
                detail: categoryId,
                bubbles: true
            }));
        }
    });
  }


}
