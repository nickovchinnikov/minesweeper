import { CellState, Coords, Field } from './Field';
import { detectSolvedPuzzle } from './detectSolvedPullze';
import { copyField } from './copyField';

/**
 * Set flag to the cell
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @param {number} prevFlagCounter
 * @param {number} bombs
 * @returns {[Field, boolean, number]}
 */
export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field,
  prevFlagCounter: number,
  bombs: number
): [Field, boolean, number] => {
  const [y, x] = coords;
  const newPlayerField = copyField(playerField);

  const cell = newPlayerField[y][x];

  const { flag, weakFlag, hidden } = CellState;

  switch (cell) {
    case flag:
      newPlayerField[y][x] = weakFlag;
      break;
    case weakFlag:
      newPlayerField[y][x] = hidden;
      break;
    case hidden:
      if (prevFlagCounter < bombs) {
        newPlayerField[y][x] = flag;
      }
      break;
  }

  const [isSolved, flagCounter] = detectSolvedPuzzle(newPlayerField, gameField);

  return [newPlayerField, isSolved, flagCounter];
};
