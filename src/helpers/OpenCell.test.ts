import { CellState, Field } from './Field';
import { openCell } from './OpenCell';

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

describe('Open cell action', () => {
  describe('Simple cases with loose', () => {
    it('Open cell with the bomb', () => {
      const playerField: Field = [
        [h, h],
        [h, h],
      ];
      const gameField: Field = [
        [1, 1],
        [1, b],
      ];
      expect(() => openCell([1, 1], playerField, gameField)).toThrow(
        JSON.stringify(gameField)
      );
    });
  });
  describe('Open cell with number', () => {
    it('Open cell with state == 1', () => {
      const playerField = openCell(
        [1, 1],
        [
          [h, h, h],
          [h, h, h],
          [h, h, h],
        ],
        [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [h, h, h],
        [h, 1, h],
        [h, h, h],
      ]);
    });
    it('Open cell with state == 3', () => {
      const playerField = openCell(
        [1, 1],
        [
          [h, h, h],
          [h, h, h],
          [h, h, h],
        ],
        [
          [9, 2, 0],
          [9, 3, 0],
          [9, 2, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [h, h, h],
        [h, 3, h],
        [h, h, h],
      ]);
    });
  });
  describe('Open empty cell', () => {
    it('Open empty cell, simple 3*3 case', () => {
      const playerField = openCell(
        [1, 2],
        [
          [h, h, h],
          [h, h, h],
          [h, h, h],
        ],
        [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [h, 1, 0],
        [h, 1, 0],
        [h, 1, 0],
      ]);
    });
    it('Open empty cell 5*5 case', () => {
      const playerField = openCell(
        [2, 2],
        [
          [h, h, h, h, h],
          [h, h, h, h, h],
          [h, h, h, h, h],
          [h, h, h, h, h],
          [h, h, h, h, h],
        ],
        [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [h, h, 1, 1, 2],
        [h, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, h],
        [2, 1, 0, 1, h],
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
        [1, 1, h],
        [f, 1, h],
        [1, 1, h],
      ];

      const newPlayerField = openCell([0, 2], playerField, gameField);

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
        [f, 3, 1, h, h],
        [1, 1, h, 1, h],
        [1, h, h, 1, f],
        [2, 1, h, 1, e],
      ];

      const newPlayerField = openCell([2, 2], playerField, gameField);

      expect(newPlayerField).toStrictEqual(gameField);
    });
  });
});
