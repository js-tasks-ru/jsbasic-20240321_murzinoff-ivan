function getMinMax(str) {
  // ваш код...
  const result = {};
  const numbers = [];
  let splitList = str.split(' ');
  
  for (let item of splitList) {
    if (Number(item)) {
      numbers.push(Number(item));
    }
  }
  
  function compareNumbers(a, b) {
    return a - b;
  }

  numbers.sort(compareNumbers);

  
  result.min = numbers.sort(compareNumbers)[0];
  result.max = numbers.sort(compareNumbers)[numbers.length - 1];

  return result;
}
