import { CellState, Coords, Field } from './Field';
import { checkItemInField, getNeigboursItems } from './CellsManipulator';
import { detectSolvedPuzzle } from './DetectSolvedPullze';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const { empty, hidden, bomb } = CellState;

  const [y, x] = coords;
  const gameCell = gameField[y][x];

  if (gameCell === bomb) {
    throw new Error(JSON.stringify(gameField));
  }

  if (gameCell === empty) {
    playerField[y][x] = gameCell;

    const items = getNeigboursItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        const playerCell = playerField[y][x];

        if (playerCell === hidden) {
          playerField = openCell([y, x], playerField, gameField);
        }
      }
    }
  }

  playerField[y][x] = gameCell;

  const [result] = detectSolvedPuzzle(playerField, gameField);

  return result;
};
