function makeFriendsList(friends) {
  // ваш код...
  const ul = document.createElement('ul');

  for (let person of friends) {

    const li = document.createElement('li');

    li.textContent = person.firstName + person.lastName;

    ul.append(li)
  }

  return ul;

}
