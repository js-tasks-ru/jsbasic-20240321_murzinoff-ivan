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
      <button class="ribbon__arrow ribbon__arrow_left">
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
    let scrollWidth = ribbon.scrollWidth;
    let scrollLeft = ribbon.scrollLeft;
    let clientWidth = ribbon.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    forwardButton.addEventListener('click', () => {
      ribbon.scrollBy(350, 0);
      showHideArrows();
    })

    backButton.addEventListener('click', () => {
      ribbon.scrollBy(-350, 0);
      showHideArrows();
    })

    const showHideArrows = () => {
      let scrollWidth = ribbon.scrollWidth;
      let scrollLeft = ribbon.scrollLeft;
      let clientWidth = ribbon.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        backButton.classList.remove('ribbon__arrow_visible');
      } else {
        backButton.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        forwardButton.classList.remove('ribbon__arrow_visible');
      } else {
        forwardButton.classList.add('ribbon__arrow_visible');
      }
    }

  }

  #userEventListeners() {
    this.elem.addEventListener('click', event => {
        const clickedCategory = event.target.closest('.ribbon__item');
        if (clickedCategory) {
            const categoryId = clickedCategory.dataset.id;

            document.querySelectorAll('.ribbon__item').forEach(item => {
              item.classList.remove('ribbon__item_active');
            })

            clickedCategory.classList.add('ribbon__item_active');

            this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
                detail: categoryId,
                bubbles: true
            }));

        }
    });
  }


}
