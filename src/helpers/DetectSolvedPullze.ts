import { CellState, Field } from './Field';

/**
 * Detect solved puzzle based on the player and game fields coorelation
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {[Field, number]}
 */
export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): [Field, number] => {
  const { hidden, bomb, flag, weakFlag } = CellState;

  let bombsCounter = 0;
  let flagCounter = 0;
  let detectedBombsCounter = 0;
  let hiddenCells = 0;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x];
      const playerCell = playerField[y][x];

      if (playerCell === hidden) {
        hiddenCells++;
      }

      if ([flag, weakFlag].includes(playerCell)) {
        flagCounter++;
      }

      if (gameCell === bomb) {
        bombsCounter++;

        if (playerCell === flag) {
          detectedBombsCounter++;
        }
      }
    }
  }

  const solvedPuzzle =
    bombsCounter === detectedBombsCounter && hiddenCells === 0;

  return [solvedPuzzle ? gameField : playerField, flagCounter];
};
