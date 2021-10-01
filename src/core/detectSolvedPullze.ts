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
  let isFieldHaveHiddenCells = false;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x];
      const playerCell = playerField[y][x];
      const isPlayerCellFlag = [flag, weakFlag].includes(playerCell);

      if (playerCell === hidden) {
        isFieldHaveHiddenCells = true;
      }

      if (isPlayerCellFlag) {
        flagCounter++;
      }

      if (gameCell === bomb) {
        bombsCounter++;

        if (isPlayerCellFlag) {
          detectedBombsCounter++;
        }
      }
    }
  }

  const isPuzzleSolved =
    bombsCounter === detectedBombsCounter &&
    flagCounter === bombsCounter &&
    !isFieldHaveHiddenCells;

  return [isPuzzleSolved, flagCounter];
};
