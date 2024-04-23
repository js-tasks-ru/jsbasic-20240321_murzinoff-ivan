function toggleText() {
  // ваш код...
  const btn = document.querySelector('button');
  const text = document.querySelector('div');

  btn.addEventListener('click', function() {
    text.hidden = !text.hidden;
  })
}
