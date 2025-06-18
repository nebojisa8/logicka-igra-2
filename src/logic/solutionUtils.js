// solutionUtils.js
export function getValue(solution, category, col) {
  // Provera postojanja kategorije i kolone
  if (!solution[category] || col < 0 || col >= solution[category].length) {
    return null;
  }
  return solution[category][col];
}
