function highlight(table) {
  // ваш код...

   for (let i = 1; i < table.rows.length; i++) {

    const row = table.rows[i];

    if (parseInt(row.cells[1].innerHTML) < 18) {
      row.style.textDecoration = 'line-through';
    }

    if (row.cells[2].innerHTML === 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }

    if (row.cells[3].dataset.available === 'true') {
        row.classList.add('available');
    } else if (row.cells[3].dataset.available === 'false') {
        row.classList.add('unavailable');
    } else if (row.cells[3].dataset.available === undefined) {
      row.setAttribute('hidden', 'hidden');
    }
  }
}
