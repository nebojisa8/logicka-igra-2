import { getValue } from '../solutionUtils.js';  // прилагоди путању ако треба

export function generateSameColumnClue(solution) {
  const keys = Object.keys(solution);
  const col = Math.floor(Math.random() * 5);
  const [cat1, cat2] = getTwoDifferent(keys);
  const item1 = getValue(solution,cat1,col);
  const item2 = getValue(solution,cat2,col);
  return {
    type: 'sameColumn',
    text: `${item1} је у истој колони са ${item2}`,
    data: { item1, item2 }
  };
}

export function generateNotSameColumnClue(solution) {
  const keys = Object.keys(solution);
  const col1 = Math.floor(Math.random() * 5);
  let col2;
  do {
    col2 = Math.floor(Math.random() * 5);
  } while (col1 === col2);

  const [cat1, cat2] = getTwoDifferent(keys);
  const item1 = getValue(solution,cat1,col1);
  const item2 = getValue(solution,cat2,col2);

  return {
    type: 'notSameColumn',
    text: `${item1} није у колони са ${item2}`,
    data: { item1, item2 }
  };
}

export function generateTripleSameColumnClue(solution) {
  const keys = Object.keys(solution);
  const col = Math.floor(Math.random() * 5);
  const [cat1, cat2, cat3] = getThreeDifferent(keys);
  const item1 = getValue(solution,cat1,col);
  const item2 = getValue(solution,cat2,col);
  const item3 = getValue(solution,cat3,col);

  return {
    type: 'tripleSameColumn',
    text: `${item1}, ${item2} и ${item3} су у истој колони`,
    data: { item1, item2, item3 }
  };
}

export function generateEitherColumnClue(solution) {
  const keys = Object.keys(solution);
  const col1 = Math.floor(Math.random() * 5);
  const col2 = Math.floor(Math.random() * 5);
  const [cat1, cat2, cat3] = getThreeDifferent(keys);
  const item = getValue(solution,cat1,col1);
  const choice1 = getValue(solution,cat2,col1);
  const choice2 = getValue(solution,cat3,col2);

  return {
    type: 'eitherColumn',
    text: `${item} је у колони са ${choice1} или ${choice2}`,
    data: { item, options: [choice1, choice2] }
  };
}

export function generateOneButNotOtherClue(solution) {
  const keys = Object.keys(solution);
  const col = Math.floor(Math.random() * 5);
  const [cat1, cat2, cat3] = getThreeDifferent(keys);
  const item = getValue(solution,cat1,col);
  const good = getValue(solution,cat2,col);
  const bad = getValue(solution, cat3, (col + 1) % 5);

  return {
    type: 'columnButNotOther',
    text: `${item} је у колони са ${good}, али није са ${bad}`,
    data: { item, good, bad }
  };
}

function getTwoDifferent(arr) {
  const first = arr[Math.floor(Math.random() * arr.length)];
  let second;
  do {
    second = arr[Math.floor(Math.random() * arr.length)];
  } while (second === first);
  return [first, second];
}

function getThreeDifferent(arr) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
