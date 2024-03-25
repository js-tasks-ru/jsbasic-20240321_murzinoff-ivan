function ucFirst(str) {
  // ваш код...
  if (str === '') return str;
  let firstLetter = str[0];
  firstLetter = firstLetter.toUpperCase();
  return firstLetter + str.substring(1);
}
