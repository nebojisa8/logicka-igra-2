import { getValue } from '../solutionUtils.js';  // прилагоди путању ако треба

export function generatePositionClue(solution) {
  const categories = ['Особе', 'Аутомобили', 'Спортови', 'Државе', 'Боје'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const col = Math.floor(Math.random() * 5);
  const entity = getValue(solution, category, col);  // ✅ исправно


  if (!entity) return null;

  return {
    type: 'position',
    entity,
    column: col
  };
}
