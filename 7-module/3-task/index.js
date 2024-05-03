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

      allStepSpans.forEach((step, index) => {
        if (chosenStep === index) {
          step.classList.add('slider__step-active');
        } else {
          step.classList.remove('slider__step-active');
        }
      })

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      this.#sliderChangeEvent(chosenStep);
    })
  }

  #sliderChangeEvent(value) {
    const sliderChanged = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    })

    this.elem.dispatchEvent(sliderChanged);
  }
}
