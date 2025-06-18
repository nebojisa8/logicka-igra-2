import { getValue } from '../solutionUtils.js';  // прилагоди путању ако треба

export function generatePositionClue(solution) {
  const categories = Object.keys(solution);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const col = Math.floor(Math.random() * 5);
  const entity = getValue(solution, category, col);

  if (!entity) return null;

  return {
    type: 'position',
    text: `${entity} се налази у колони ${col + 1}`,
    data: { entity, column: col }
  };
}
