import { CellState, Field } from './Field';
import { setFlag } from './setFlag';

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

      const [newPlayerField] = setFlag([0, 0], playerField, gameField);

      expect(newPlayerField).toStrictEqual([
        [1, h, h],
        [h, h, h],
        [h, h, h],
      ]);
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

      const [playerFieldAfterFirstClick] = setFlag(
        [0, 0],
        playerField,
        gameField
      );

      expect(playerFieldAfterFirstClick).toStrictEqual([
        [f, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      const [playerFieldAfterSecondClick] = setFlag(
        [0, 0],
        playerField,
        gameField
      );

      expect(playerFieldAfterSecondClick).toStrictEqual([
        [w, h, h],
        [h, h, h],
        [h, h, h],
      ]);

      const [playerFieldAfterThirdClick] = setFlag(
        [0, 0],
        playerField,
        gameField
      );

      expect(playerFieldAfterThirdClick).toStrictEqual([
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ]);
    });
  });
  describe('Detect win state', () => {
    it('5*5 solved case', () => {
      const [playerField, isSolved, flagCounter] = setFlag(
        [1, 0],
        [
          [f, f, 1, 1, 2],
          [h, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, f],
          [2, 1, 0, 1, 0],
        ],
        [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0],
        ]
      );

      expect(flagCounter).toBe(4);
      expect(isSolved).toStrictEqual(true);
      expect(playerField).toStrictEqual([
        [f, f, 1, 1, 2],
        [f, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, f],
        [2, 1, 0, 1, 0],
      ]);
    });
  });
});
