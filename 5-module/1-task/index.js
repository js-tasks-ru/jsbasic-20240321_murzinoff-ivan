function hideSelf() {
  // ваш код...

  const button = document.querySelector('button');

  button.addEventListener('click', function() {
    button.hidden = 'true';
  })
}
