/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */



export default class UserTable {
  elem = null;

  constructor(rows) {
    this.rows = rows;
    this.elem = this.#render();
  }

  #render() {
    const table = document.createElement('table');
    const head = document.createElement('thead');
    const body = document.createElement('tbody');

    const header = document.createElement('tr');
    ['Имя', 'Возраст', 'Зарплата', 'Город', ''].forEach(columnName => {
      const th = document.createElement('th');
      th.textContent = columnName;
      header.append(th);
    });

    head.append(header);


    this.rows.forEach(obj => {
      const row = document.createElement('tr');

      for (let key in obj) {
        const td = document.createElement('td');
        td.textContent = obj[key];
        row.append(td);
      }

      const deleteTd = document.createElement('td');
      const deleteButton = document.createElement('button');

      deleteButton.textContent = '[X]';
      deleteButton.addEventListener('click', () => {
        row.remove();
      });

      deleteTd.append(deleteButton);
      row.append(deleteTd);
      body.append(row)

    })


    table.append(head);
    table.append(body);
  
    return table;

  }
}

