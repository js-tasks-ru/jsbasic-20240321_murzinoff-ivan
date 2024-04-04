function showSalary(users, age) {
  // ваш код...
  let salaryList = '';
  for (let prop in users) {
    if (users[prop].age <= age){
      salaryList = salaryList + users[prop].name + ', ' + users[prop].balance + '\n';
    }
  }
  return salaryList.slice(0, -1);
}
