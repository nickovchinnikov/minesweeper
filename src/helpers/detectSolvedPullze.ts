import { CellState, Field } from './Field';

/**
 * Detect solved puzzle based on the player and game fields coorelation
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {[boolean, number]}
 */
export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): [boolean, number] => {
  const { hidden, bomb, flag, weakFlag } = CellState;

  let bombsCounter = 0;
  let flagCounter = 0;
  let detectedBombsCounter = 0;
  let hiddenCounter = 0;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x];
      const playerCell = playerField[y][x];

      if (playerCell === hidden) {
        hiddenCounter++;
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

  const isPuzzleSolved =
    bombsCounter === detectedBombsCounter && hiddenCounter === 0;

  return [isPuzzleSolved, flagCounter];
};
