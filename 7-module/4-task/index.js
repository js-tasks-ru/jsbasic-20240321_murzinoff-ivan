export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
    this.#sliderEventListeners();
    this.#sliderChangeEvent();
  }

  #render() {
    const slider = document.createElement('div');
    slider.classList.add('slider');

    const sliderThumb = document.createElement('div');
    const sliderValue = document.createElement('span');
    const sliderProgress = document.createElement('div');
    const sliderSteps = document.createElement('div');

    sliderThumb.classList.add('slider__thumb');
    sliderValue.classList.add('slider__value');
    sliderProgress.classList.add('slider__progress');
    sliderSteps.classList.add('slider__steps');

    slider.append(sliderThumb, sliderProgress, sliderSteps);
    sliderThumb.append(sliderValue);

    sliderValue.textContent = `${this.value}`;

    for (let i = 0; i <= this.steps - 1; i++) {
      let sliderStep = document.createElement('span');
      if (i == this.value) {
        sliderStep.classList.add('slider__step-active');
      }
      sliderSteps.append(sliderStep);

      sliderThumb.ondragstart = () => preventDefault();
      sliderThumb.addEventListener('pointerdown', this.#onDown)
    }
    return slider;
  }

  #sliderEventListeners() {
    this.elem.addEventListener('click', (event) => {

      let clickX = event.clientX - this.elem.getBoundingClientRect().left;
      const { width } = this.elem.getBoundingClientRect();
      const oneStepWidth = width / (this.steps - 1);
      const chosenStep = (clickX / oneStepWidth + 0.5) | 0;

      let leftPercents = ((chosenStep / (this.steps - 1)) * 100).toFixed(0);
      
      const sliderValue = this.elem.querySelector('.slider__value');
      const sliderSteps = this.elem.querySelector('.slider__steps');
      const allStepSpans = sliderSteps.querySelectorAll('span');
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      sliderValue.textContent = chosenStep;
      this.value = chosenStep;

      allStepSpans.forEach((step, index) => {
        if (chosenStep === index) {
          step.classList.add('slider__step-active');
        } else {
          step.classList.remove('slider__step-active');
        }
      })

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      this.#sliderChangeEvent();
    })
  }

  #sliderChangeEvent() {
    const sliderChanged = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })

    this.elem.dispatchEvent(sliderChanged);
  }

  #onDown = () => {
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp);


  }

  #onMove = event => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const sliderValue = this.elem.querySelector('.slider__value');
    const sliderSteps = this.elem.querySelector('.slider__steps');
    const allStepSpans = sliderSteps.querySelectorAll('span');
    

    const { width } = this.elem.getBoundingClientRect();
    let { pageX } = event;
    const oneStepWidth = width / (this.steps - 1);
    let positionX = pageX - this.elem.getBoundingClientRect().left;
    let chosenStep = (positionX / oneStepWidth + 0.5) | 0;

    document.querySelector('.slider').classList.add('slider_dragging');
    let leftPercents = ((chosenStep / (this.steps - 1)) * 100).toFixed(0);

    if (this.value !== this.steps - 1) {
      this.value = chosenStep;
      sliderValue.textContent = chosenStep;
      allStepSpans.forEach((step, index) => {
        if (chosenStep === index) {
          step.classList.add('slider__step-active');
        } else {
          step.classList.remove('slider__step-active');
        }
      })
      thumb.style.left = `${((positionX / width) * 100).toFixed(0)}%`;
      progress.style.width = `${((positionX / width) * 100).toFixed(0)}%`;
    } else {
      this.value = chosenStep;
      sliderValue.textContent = this.steps - 1;
      this.value = this.steps - 1;
      thumb.style.left = `100%`;
      progress.style.width = `100%`;
    }
  }

  #onUp = event => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const sliderValue = this.elem.querySelector('.slider__value');

    const { width } = this.elem.getBoundingClientRect();
    let { pageX } = event;
    const oneStepWidth = width / (this.steps - 1);
    let positionX = pageX - this.elem.getBoundingClientRect().left;
    let chosenStep = (positionX / oneStepWidth + 0.5) | 0;

    let leftPercents = ((chosenStep / (this.steps - 1)) * 100).toFixed(0);

    if (this.value !== this.steps - 1) {
      this.value = chosenStep;
      sliderValue.textContent = chosenStep;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    } else {
      this.value = chosenStep;
      sliderValue.textContent = this.steps - 1;
      this.value = this.steps - 1;
      thumb.style.left = `100%`;
      progress.style.width = `100%`;
    }

    document.querySelector('.slider').classList.remove('slider_dragging');
    this.#sliderChangeEvent();
    document.removeEventListener('pointermove', this.#onMove);
    document.removeEventListener('pointerup', this.#onUp);
  }
}
