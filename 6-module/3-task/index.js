import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.elem = this.#render();
    this.#addButtonsEventListeners();
    this.#initCarousel();
  }

  #render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this.slides.map(slide => `
            <div class="carousel__slide" data-id=${slide.id}>
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide"/>
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon"/>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
    `)

    return carousel;
  }

  #initCarousel() {
    // ваш код...
    const forwardButton = this.elem.querySelector('.carousel__arrow_right');
    const backButton = this.elem.querySelector('.carousel__arrow_left');
    const carousel = this.elem.querySelector('.carousel__inner');
    
    let currentSlideIndex = 0;
  
    backButton.style.display = 'none';
  
    forwardButton.addEventListener('click', () => {
      const slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
      currentSlideIndex++;
      carousel.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
      backButton.style.display = '';

      if (currentSlideIndex === this.slides.length - 1) {
        forwardButton.style.display = 'none';
      }
    })
  
    backButton.addEventListener('click', () => {
      const slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
      currentSlideIndex--;
      carousel.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;

      if (currentSlideIndex < this.slides.length - 1) {
        forwardButton.style.display = '';
      }

      if (currentSlideIndex === 0) {
        backButton.style.display = 'none';
      }
    })
  }

  #addButtonsEventListeners() {
    this.elem.addEventListener('click', event => {
        const addButton = event.target.closest('.carousel__button');
        if (addButton) {
            const slideId = addButton.closest('.carousel__slide').dataset.id;
            this.elem.dispatchEvent(new CustomEvent("product-add", {
                detail: slideId,
                bubbles: true
            }));
        }
    });
  }
}
