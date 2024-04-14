function toggleText() {
  // ваш код...
  const btn = document.querySelector('button');
  const text = document.querySelector('div');

  btn.addEventListener('click', function() {
    if (text.dataset.hidden === 'no') {
      text.hidden = 'true';
      text.dataset.hidden = 'yes';
    } else {
      text.hidden = '';
      text.dataset.hidden = 'no';
    }
  })
}
