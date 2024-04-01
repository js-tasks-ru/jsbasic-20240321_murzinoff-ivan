function namify(users) {
  // ваш код...
  let arr = [];
  for (let elem of users) {
    arr.push(elem.name);
  }
  return arr;
}
