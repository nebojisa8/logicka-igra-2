export function translateCluesToConstraints(solver, clues) {
  if (!Array.isArray(clues)) {
    console.error('❌ translateCluesToConstraints: "clues" није низ:', clues);
    return [];
  }

  const constraints = [];

  for (const clue of clues) {
    const { type, data } = clue;

    switch (type) {
      case 'position': {
        const { category, item, position } = data;
        constraints.push(solver.eq(solver.var(`${category}:${position}`), item));
        break;
      }

      case 'adjacent': {
        const { category1, item1, category2, item2 } = data;
        for (let i = 0; i < 4; i++) {
          const cond = solver.and([
            solver.var(`${category1}:${i}`) === item1,
            solver.var(`${category2}:${i + 1}`) === item2
          ]);
          const condRev = solver.and([
            solver.var(`${category1}:${i + 1}`) === item1,
            solver.var(`${category2}:${i}`) === item2
          ]);
          constraints.push(solver.or(cond, condRev));
        }
        break;
      }

      case 'notAdjacent': {
        const { category1, item1, category2, item2 } = data;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (Math.abs(i - j) === 1) {
              constraints.push(
                solver.not(solver.and([
                  solver.eq(solver.var(`${category1}:${i}`), item1),
                  solver.eq(solver.var(`${category2}:${j}`), item2)
                ]))
              );
            }
          }
        }
        break;
      }

      case 'between': {
        const { category1, item1, category2, item2, category3, item3 } = data;
        for (let i = 1; i < 4; i++) {
          const middle = solver.and([
            solver.eq(solver.var(`${category2}:${i}`), item2),
            solver.or(
              solver.and(
                solver.eq(solver.var(`${category1}:${i - 1}`), item1),
                solver.eq(solver.var(`${category3}:${i + 1}`), item3)
              ),
              solver.and(
                solver.eq(solver.var(`${category1}:${i + 1}`), item1),
                solver.eq(solver.var(`${category3}:${i - 1}`), item3)
              )
            )
          ]);
          constraints.push(middle);
        }
        break;
      }

      case 'notBetween': {
        const { category1, item1, category2, item2, category3, item3 } = data;
        for (let i = 1; i < 4; i++) {
          const middle = solver.and([
            solver.eq(solver.var(`${category2}:${i}`), item2),
            solver.or(
              solver.and(
                solver.eq(solver.var(`${category1}:${i - 1}`), item1),
                solver.eq(solver.var(`${category3}:${i + 1}`), item3)
              ),
              solver.and(
                solver.eq(solver.var(`${category1}:${i + 1}`), item1),
                solver.eq(solver.var(`${category3}:${i - 1}`), item3)
              )
            )
          ]);
          constraints.push(solver.not(middle));
        }
        break;
      }

      case 'leftOf': {
        const { category1, item1, category2, item2 } = data;
        for (let i = 0; i < 4; i++) {
          constraints.push(
            solver.implies(
              solver.and([
                solver.eq(solver.var(`${category1}:${i}`), item1),
                solver.eq(solver.var(`${category2}:${i + 1}`), item2)
              ]),
              true
            )
          );
        }
        break;
      }

      case 'sameColumn': {
        const { category1, item1, category2, item2 } = data;
        for (let i = 0; i < 5; i++) {
          constraints.push(
            solver.implies(
              solver.and([
                solver.eq(solver.var(`${category1}:${i}`), item1)
              ]),
              solver.eq(solver.var(`${category2}:${i}`), item2)
            )
          );
        }
        break;
      }

      case 'notSameColumn': {
        const { category1, item1, category2, item2 } = data;
        for (let i = 0; i < 5; i++) {
          constraints.push(
            solver.not(
              solver.and([
                solver.eq(solver.var(`${category1}:${i}`), item1),
                solver.eq(solver.var(`${category2}:${i}`), item2)
              ])
            )
          );
        }
        break;
      }

      case 'tripleSameColumn': {
        const { category1, item1, category2, item2, category3, item3 } = data;
        for (let i = 0; i < 5; i++) {
          constraints.push(
            solver.implies(
              solver.and([
                solver.eq(solver.var(`${category1}:${i}`), item1),
                solver.eq(solver.var(`${category2}:${i}`), item2),
              ]),
              solver.eq(solver.var(`${category3}:${i}`), item3)
            )
          );
        }
        break;
      }

      case 'eitherColumn': {
        const { category, item, position1, position2 } = data;
        constraints.push(
          solver.or(
            solver.eq(solver.var(`${category}:${position1}`), item),
            solver.eq(solver.var(`${category}:${position2}`), item)
          )
        );
        break;
      }

      case 'columnButNotOther': {
        const { category, item, position1, position2 } = data;
        constraints.push(
          solver.or(
            solver.and(
              solver.eq(solver.var(`${category}:${position1}`), item),
              solver.not(solver.eq(solver.var(`${category}:${position2}`), item))
            ),
            solver.and(
              solver.eq(solver.var(`${category}:${position2}`), item),
              solver.not(solver.eq(solver.var(`${category}:${position1}`), item))
            )
          )
        );
        break;
      }

      default:
        console.warn(`⚠️ Непознат тип трага: ${type}`);
    }
  }

  return constraints;
}
