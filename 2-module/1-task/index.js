function sumSalary(salaries) {
  // ваш код...
  let sumVar = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === 'number' && isFinite(salaries[key])) {
      sumVar += salaries[key]
    }
  }
  return sumVar;
}
