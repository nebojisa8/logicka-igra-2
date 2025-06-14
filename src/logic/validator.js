import { translateCluesToConstraints } from './translateCluesToConstraints';
import solverLib from 'logic-solver';

export function validateSolutionUniqueness(clues) {
  if (!Array.isArray(clues)) {
    console.error('❌ Неправилан формат за clues:', clues);
    throw new Error('Clues мора бити низ.');
  }

  const solver = new solverLib.Solver();
  const constraints = translateCluesToConstraints(solver, clues);
  constraints.forEach(constraint => solver.require(constraint));
  const solutions = solver.solveAll();
  return solutions.length === 1;
}
