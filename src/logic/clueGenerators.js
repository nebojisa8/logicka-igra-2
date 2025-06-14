import { solvePuzzle } from './cspSolver';
import { validateSolutionUniqueness } from './validator';

import {
  generatePositionClue,
  generateAdjacentClue,
  generateNotAdjacentClue,
  generateBetweenClue,
  generateNotBetweenClue,
  generateLeftOfClue,
  generateSameColumnClue,
  generateNotSameColumnClue,
  generateTripleSameColumnClue,
  generateEitherColumnClue,
  generateOneButNotOtherClue
} from './generators';

const generatorConfig = [
  { type: 'position', min: 0, max: 3, generator: generatePositionClue },
  { type: 'adjacent', min: 3, max: 8, generator: generateAdjacentClue },
  { type: 'notAdjacent', min: 1, max: 3, generator: generateNotAdjacentClue },
  { type: 'between', min: 1, max: 4, generator: generateBetweenClue },
  { type: 'notBetween', min: 1, max: 4, generator: generateNotBetweenClue },
  { type: 'leftOf', min: 1, max: 3, generator: generateLeftOfClue },
  { type: 'sameColumn', min: 2, max: 5, generator: generateSameColumnClue },
  { type: 'notSameColumn', min: 1, max: 3, generator: generateNotSameColumnClue },
  { type: 'tripleSameColumn', min: 1, max: 2, generator: generateTripleSameColumnClue },
  { type: 'eitherColumn', min: 0, max: 2, generator: generateEitherColumnClue },
  { type: 'columnButNotOther', min: 0, max: 2, generator: generateOneButNotOtherClue }
];

const difficultyLevels = {
  easy:   { min: 10, max: 13 },
  medium: { min: 14, max: 17 },
  hard:   { min: 18, max: 22 }
};

export function generateCluesFromSolution(difficulty = 'medium') {
  const { min: MIN_CLUES_TOTAL, max: MAX_CLUES_TOTAL } = difficultyLevels[difficulty];
  const solutionSet = solvePuzzle(); // без додатних constraint-а
  if (!solutionSet.length) throw new Error('Нема решења.');

  const finalSolution = solutionSet[0];
  console.log("📦 finalSolution", finalSolution);

  for (let attempt = 0; attempt < 100; attempt++) {
    const clues = [];
    const typeCounts = {};

    for (const { type, min, max, generator } of generatorConfig) {
      const targetCount = getRandomInt(min, max);
      typeCounts[type] = 0;
      let retries = 0;

      while (typeCounts[type] < targetCount && retries++ < 30) {
        try {
          const clue = generator(finalSolution);
          if (
            clue &&
            !clues.some(c => JSON.stringify(c) === JSON.stringify(clue))
          ) {
            clues.push(clue);
            typeCounts[type]++;
          }
        } catch (e) {
          console.warn(`⚠️ Грешка при генерисању трага типа '${type}':`, e);
        }
      }
    }

    if (clues.length >= MIN_CLUES_TOTAL && clues.length <= MAX_CLUES_TOTAL) {
      const isUnique = validateSolutionUniqueness(clues);
      if (isUnique) {
        const stats = Object.entries(typeCounts)
          .map(([type, count]) => ({ type, count }))
          .filter(entry => entry.count > 0);

        return { clues, stats, difficulty, solution: finalSolution };
      }
    }
  }

  console.warn("🧩 Генерисано трагова:", clues);
  console.warn("📉 Ниједан сет трагова није прошао проверу јединствености.");


  throw new Error('Није могуће пронаћи ваљан скуп трагова.');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
