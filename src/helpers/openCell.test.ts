import { CellState } from './Field';
import { openCell } from './openCell';

const { empty: e, hidden: h, bomb: b, weakFlag: w, flag: f } = CellState;

describe('Open cell action', () => {
  describe('Simple cases with loose', () => {
    it('Open cell with the bomb', () => {
      expect(() =>
        openCell(
          [1, 1],
          [
            [h, h],
            [h, h],
          ],
          [
            [1, 1],
            [1, b],
          ]
        )
      ).toThrow('Game Over');
    });
    it("Open cell with the flag it shouldn't open", () => {
      const [playerField, isSolved] = openCell(
        [1, 1],
        [
          [h, h, h],
          [h, f, h],
          [h, h, h],
        ],
        [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
      );

      expect(isSolved).toBe(false);
      expect(playerField).toStrictEqual([
        [h, h, h],
        [h, f, h],
        [h, h, h],
      ]);
    });
    it('Open cell with the weak flag should open', () => {
      const [playerField] = openCell(
        [1, 1],
        [
          [h, h, h],
          [h, w, h],
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
  });
  describe('Open cell with number', () => {
    it('Open cell with state == 1', () => {
      const [playerField] = openCell(
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
      const [playerField] = openCell(
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
      const [playerField] = openCell(
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
      const [playerField] = openCell(
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
  describe('Detect win state', () => {
    it('5*5 solved case', () => {
      const [playerField, isSolved] = openCell(
        [4, 0],
        [
          [f, f, 1, 1, 2],
          [f, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, f],
          [h, 1, 0, 1, 0],
        ],
        [
          [9, 9, 1, 1, 2],
          [9, 3, 1, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 0, 0, 1, 9],
          [2, 1, 0, 1, 0],
        ]
      );

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
