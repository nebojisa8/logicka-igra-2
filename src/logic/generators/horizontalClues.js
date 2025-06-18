import { getValue } from '../solutionUtils.js';  // прилагоди путању ако треба

export function generateAdjacentClue(solution) {
  const categories = Object.keys(solution);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const col = Math.floor(Math.random() * 4); // позиције 0–3
  const item1 = getValue(solution,category,col);
  const item2 = getValue(solution,category,col + 1);
  return {
    type: 'adjacent',
    text: `${item1} је до ${item2}`,
    data: { item1, item2 }
  };
}

export function generateNotAdjacentClue(solution) {
  const categories = Object.keys(solution);
  const category = categories[Math.floor(Math.random() * categories.length)];
  let col1 = Math.floor(Math.random() * 5);
  let col2;
  do {
    col2 = Math.floor(Math.random() * 5);
  } while (Math.abs(col1 - col2) === 1 || col1 === col2);

  const item1 = getValue(solution,category,col1);
  const item2 = getValue(solution,category,col2);
  return {
    type: 'notAdjacent',
    text: `${item1} није до ${item2}`,
    data: { item1, item2 }
  };
}

export function generateBetweenClue(solution) {
  const categories = Object.keys(solution);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const col = Math.floor(Math.random() * 3) + 1; // позиције 1–3
  const middle = getValue(solution,category,col);
  const left = getValue(solution,category,col - 1);
  const right = getValue(solution,category,col + 1);
  return {
    type: 'between',
    text: `${middle} је између ${left} и ${right}`,
    data: { middle, left, right }
  };
}

export function generateNotBetweenClue(solution) {
  const categories = Object.keys(solution);
  const category = categories[Math.floor(Math.random() * categories.length)];
  let col;
  do {
    col = Math.floor(Math.random() * 5);
  } while (col === 0 || col === 4); // избегавамо крајеве

  const middle = getValue(solution,category,col);
  const left = getValue(solution,category,col - 1);
  const right = getValue(solution,category,col + 1);

  return {
    type: 'notBetween',
    text: `${middle} није између ${left} и ${right}`,
    data: { middle, left, right }
  };
}

export function generateLeftOfClue(solution) {
  const categories = Object.keys(solution);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const col = Math.floor(Math.random() * 3) + 1; // 1-3 (izbegavamo rubove)
  const left = getValue(solution, category, col - 1);
  const right = getValue(solution, category, col + 1);
  
  return {
    type: 'leftOf',
    text: `${left} је лево од ${right}`,
    data: { left, right }
  };
}
