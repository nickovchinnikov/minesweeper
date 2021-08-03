import { Cell, CellState, Coords, Field } from './Field';

/**
 * Get neighbour cells indexes
 * @param {Coords} coords
 * @returns {Record<string, [number, number]>}
 */
export const getNeigboursItems = ([y, x]: Coords): Record<
  string,
  [number, number]
> => ({
  top: [y - 1, x],
  topRight: [y - 1, x + 1],
  right: [y, x + 1],
  rightBottom: [y + 1, x + 1],
  bottom: [y + 1, x],
  bottomLeft: [y + 1, x - 1],
  left: [y, x - 1],
  leftTop: [y - 1, x - 1],
});

/**
 * Check item in the field
 * @param {Coords} coords
 * @param {Field} field
 * @returns {boolean}
 */
export const checkItemInField = ([y, x]: Coords, { length }: Field): boolean =>
  y >= 0 && x >= 0 && length - y > 0 && length - x > 0;

/**
 * Increment neighbour items for cell with coords
 * @param {Coords} coords
 * @param {Field} field
 * @returns {Cell}
 */
export const incrementNeibours = (coords: Coords, field: Field): Field => {
  const items = getNeigboursItems(coords);

  for (const [y, x] of Object.values(items)) {
    if (checkItemInField([y, x], field)) {
      const cell = field[y][x];
      if (cell < 8) {
        field[y][x] = (cell + 1) as Cell;
      }
    }
  }

  return field;
};

/**
 * Detect solved puzzle based on the player and game fields coorelation
 * @param playerField
 * @param gameField
 * @returns
 */
export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): Field => {
  const { hidden, bomb, flag } = CellState;

  let bombsCounter = 0;
  let detectedBombsCounter = 0;
  let hiddenCells = 0;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x];
      const playerCell = playerField[y][x];

      if (playerCell === hidden) {
        hiddenCells++;
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

  return solvedPuzzle ? gameField : playerField;
};

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
    throw new Error('Game Over');
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

  return detectSolvedPuzzle(playerField, gameField);
};

/**
 * Set flag to the cell
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const [y, x] = coords;
  const cell = playerField[y][x];

  const { flag, weakFlag, hidden } = CellState;

  switch (cell) {
    case flag:
      playerField[y][x] = weakFlag;
      break;
    case weakFlag:
      playerField[y][x] = hidden;
      break;
    case hidden:
      playerField[y][x] = flag;
  }

  return detectSolvedPuzzle(playerField, gameField);
};
