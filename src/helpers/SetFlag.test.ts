import { CellState, Field } from './Field';
import { setFlag } from './SetFlag';

const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

describe('Set flag action', () => {
  describe('Set flag to the cell check', () => {
    it('Set flag to the non hidden cell should be ignored', () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];
      const playerField: Field = [
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ];

      const [newPlayerField, flagCounter] = setFlag(
        [0, 0],
        playerField,
        gameField
      );

      expect(flagCounter).toBe(0);

      expect(newPlayerField).toStrictEqual(playerField);
    });
    it('Set Flag action, simple 3*3 case', () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];

      const playerField: Field = [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ];

      const [playerFieldAfterFirstClick, flagCounterAfterFirstClick] = setFlag(
        [0, 0],
        playerField,
        gameField
      );

      expect(playerFieldAfterFirstClick).toStrictEqual([
        [f, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      expect(flagCounterAfterFirstClick).toBe(1);

      const [playerFieldAfterSecondClick, flagCounterAfterSecondClick] =
        setFlag([0, 0], playerField, gameField);

      expect(playerFieldAfterSecondClick).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      expect(flagCounterAfterSecondClick).toBe(1);

      const [playerFieldAfterThirdClick, flagCounterAfterThirdClick] = setFlag(
        [0, 0],
        playerField,
        gameField
      );

      expect(flagCounterAfterThirdClick).toBe(0);

      expect(playerFieldAfterThirdClick).toStrictEqual([
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
  });

  describe('Detect solved puzzle', () => {
    it('Simplest 3*3 case', () => {
      const gameField: Field = [
        [1, 1, e],
        [b, 1, e],
        [1, 1, e],
      ];

      const playerField: Field = [
        [1, 1, e],
        [h, 1, e],
        [1, 1, e],
      ];

      const [newPlayerField, flagCounter] = setFlag(
        [1, 0],
        playerField,
        gameField
      );

      expect(flagCounter).toBe(1);

      expect(newPlayerField).toStrictEqual(gameField);
    });
    it('5*5 case with weak mark', () => {
      const gameField: Field = [
        [9, 9, 1, 1, 2],
        [9, 3, 1, e, e],
        [1, 1, e, 1, 1],
        [1, e, e, 1, 9],
        [2, 1, e, 1, e],
      ];

      const playerField: Field = [
        [f, f, 1, 1, 2],
        [h, 3, 1, h, h],
        [h, 1, h, 1, h],
        [h, h, h, 1, w],
        [h, 1, h, 1, e],
      ];

      const [playerFieldWithOneFlag, flagCounterAfterFirstClick] = setFlag(
        [1, 0],
        playerField,
        gameField
      );

      expect(flagCounterAfterFirstClick).toBe(4);

      expect(playerFieldWithOneFlag).toStrictEqual([
        [f, f, 1, 1, 2],
        [f, 3, 1, h, h],
        [h, 1, h, 1, h],
        [h, h, h, 1, w],
        [h, 1, h, 1, e],
      ]);

      const playerFieldSolvedPuzzle: Field = [
        [f, f, 1, 1, 2],
        [h, 3, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, f],
        [0, 1, 0, 1, e],
      ];

      const [result, flagCounter] = setFlag(
        [1, 0],
        playerFieldSolvedPuzzle,
        gameField
      );

      expect(flagCounter).toBe(4);

      expect(result).toStrictEqual(gameField);
    });
  });
});
