import solver, { Expr } from 'logic-solver';

export function getAllConstraints() {
  const constraints = [];

  // пример ограничења: сваки елемент из категорије може бити само у једној колони
  const categories = ['Особе', 'Аутомобили', 'Спортови', 'Државе', 'Боје'];
  const values = {
    'Особе': ['Бранислав', 'Иван', 'Јован', 'Милан', 'Петар'],
    'Аутомобили': ['Такси', 'Ауди', 'Југо', 'Фиат', 'Форд'],
    'Спортови': ['Фудбал', 'Рвање', 'Шах', 'Кошарка', 'Пливање'],
    'Државе': ['Србија', 'Француска', 'Русија', 'Грчка', 'Кина'],
    'Боје': ['Црвена', 'Плава', 'Жута', 'Зелена', 'Љубичаста']
  };

  for (const category of categories) {
    for (const value of values[category]) {
      // value се мора појавити у тачно једној позицији (0–4)
      const vars = [];
      for (let pos = 0; pos < 5; pos++) {
        vars.push(`${category}:${pos}=${value}`);
      }
      constraints.push(solver.exactlyOne(vars));
    }

    for (let pos = 0; pos < 5; pos++) {
      // свака позиција има тачно једну вредност
      const vars = values[category].map(value => `${category}:${pos}=${value}`);
      constraints.push(solver.exactlyOne(vars));
    }
  }

  return constraints;
}

export function solvePuzzle(extraConstraints = []) {
  const s = new solver.Solver();

  const allConstraints = getAllConstraints();
  allConstraints.forEach(clause => s.require(clause));
  extraConstraints.forEach(clause => s.require(clause));

  const rawSolution = s.solve(); // добијамо map-like објекат решења
  if (!rawSolution) return [];

  console.log("📦 Raw solution map:", rawSolution.getMap());

  const parsed = parseSolution(rawSolution.getMap());
  return [parsed];
}

function parseSolution(map) {
  const result = {};

  for (const key in map) {
    if (!map[key]) continue;
    const [category, pair] = key.split(':');
    const [index, value] = pair.split('=');

    if (!result[category]) {
      result[category] = [];
    }

    result[category][parseInt(index)] = value;
  }

  return result;
}

