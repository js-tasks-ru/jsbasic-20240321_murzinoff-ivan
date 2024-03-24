function factorial(n) {
  let result = 1;
  if (n === 0) {
    return result;
  } else {
    while (n > 0) {
      result *= n;
      n--;
    }
    return result;
  }
}