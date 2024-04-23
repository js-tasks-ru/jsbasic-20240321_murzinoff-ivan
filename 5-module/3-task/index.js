function initCarousel() {
  // ваш код...
  const forwardButton = document.querySelector('.carousel__arrow_right');
  const backButton = document.querySelector('.carousel__arrow_left');
  const carousel = document.querySelector('.carousel__inner');

  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let currentSlideIndex = 0;

  backButton.style.display = 'none';

  forwardButton.addEventListener('click', function(event) {
    currentSlideIndex++;
    carousel.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
    backButton.style.display = '';

    if (currentSlideIndex === 3) {
      forwardButton.style.display = 'none';
    }
  })

  backButton.addEventListener('click', function() {
    currentSlideIndex--;
    carousel.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;

    if (currentSlideIndex < 3) {
      forwardButton.style.display = '';
    }

    if (currentSlideIndex === 0) {
      backButton.style.display = 'none';
    }
  })
}
