import solver from 'logic-solver';

const categories = ['Особе', 'Аутомобили', 'Спортови', 'Државе', 'Боје'];
const values = {
  'Особе': ['Бранислав', 'Иван', 'Милан', 'Ана', 'Јелена'],
  'Аутомобили': ['Такси', 'Ауди', 'Фиат', 'Форд', 'Ситроен'],
  'Спортови': ['Фудбал', 'Кошарка', 'Пливање', 'Рвање', 'Тенис'],
  'Државе': ['Србија', 'Француска', 'Немачка', 'Русија', 'Италија'],
  'Боје': ['Црвена', 'Плава', 'Зелена', 'Жута', 'Љубичаста']
};

function getAllConstraints() {
  const clauses = [];

  for (const category of categories) {
    const catValues = values[category];

    // Свака вредност мора бити у једној колони
    for (const value of catValues) {
      const vars = [];
      for (let col = 0; col < 5; col++) {
        vars.push(`${category}:${col}=${value}`);
      }
      clauses.push(solver.exactlyOne(vars));
    }

    // Свака колона мора имати једну вредност
    for (let col = 0; col < 5; col++) {
      const vars = [];
      for (const value of catValues) {
        vars.push(`${category}:${col}=${value}`);
      }
      clauses.push(solver.exactlyOne(vars));
    }
  }

  return clauses;
}

export { getAllConstraints, categories, values };
