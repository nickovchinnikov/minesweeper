import { CellState, Field } from './Field';
import {
  incrementNeibours,
  getNeigboursItems,
  checkItemInField,
} from './CellsManipulator';

const { empty: e, hidden: h, bomb: b } = CellState;

describe('Check neigbours selectors', () => {
  it('With [0, 0] coords', () => {
    expect(getNeigboursItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    });
  });
  it('With [3, 3] coords', () => {
    expect(getNeigboursItems([3, 3])).toStrictEqual({
      top: [2, 3],
      topRight: [2, 4],
      right: [3, 4],
      rightBottom: [4, 4],
      bottom: [4, 3],
      bottomLeft: [4, 2],
      left: [3, 2],
      leftTop: [2, 2],
    });
  });
});

describe('checkItemInField tests', () => {
  describe('Simple cases', () => {
    const field: Field = [[e]];

    it('Out of y range', () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });

    it('Out of x range', () => {
      expect(checkItemInField([0, -1], field)).toBe(false);
    });

    it('In x and y range', () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });
  describe('Big field', () => {
    const field: Field = [
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
    ];

    it('Out of x range', () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });

    it('Out of x range with negative index', () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });

    it('Out of y range', () => {
      expect(checkItemInField([0, 5], field)).toBe(false);
    });

    it('In x and y range', () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });
});

describe('Check Increment Neibours', () => {
  describe('Simple cases', () => {
    it('Field with only one item', () => {
      expect(incrementNeibours([0, 0], [[b]])).toStrictEqual([[b]]);
    });
    it('Field 2x2 with one mine', () => {
      expect(
        incrementNeibours(
          [0, 0],
          [
            [b, e],
            [e, e],
          ]
        )
      ).toStrictEqual([
        [b, 1],
        [1, 1],
      ]);
    });
    it('Field 2x2 with two mines', () => {
      expect(
        incrementNeibours(
          [0, 0],
          [
            [b, e],
            [e, b],
          ]
        )
      ).toStrictEqual([
        [b, 1],
        [1, b],
      ]);
    });
  });
  describe('3x3 cases', () => {
    it('Field 3x3 with one centered mine', () => {
      expect(
        incrementNeibours(
          [1, 1],
          [
            [e, e, e],
            [e, b, e],
            [e, e, e],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, b, 1],
        [1, 1, 1],
      ]);
    });
    it('Field 3x3 with two mines', () => {
      expect(
        incrementNeibours(
          [1, 1],
          [
            [0, 1, b],
            [0, b, 1],
            [0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [1, 2, b],
        [1, b, 2],
        [1, 1, 1],
      ]);
    });
    it('Field 3x3 as syntetic case with neighbors cells is reached max possible bombs', () => {
      expect(
        incrementNeibours(
          [1, 1],
          [
            [0, 1, b],
            [8, b, 1],
            [8, 8, 8],
          ]
        )
      ).toStrictEqual([
        [1, 2, b],
        [8, b, 2],
        [8, 8, 8],
      ]);
    });
  });
  describe('9x9 cases', () => {
    it('Field 9x9 with 7 mines', () => {
      expect(
        incrementNeibours(
          [4, 5],
          [
            [9, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 0, 0, 0],
            [0, 1, 1, 2, 9, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [9, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 2, 1, 2, 9, 1],
        [0, 1, 1, 1, 2, 9, 2, 1, 1],
        [0, 1, 9, 2, 2, 2, 1, 0, 0],
        [0, 1, 1, 2, 9, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });
    it('Field 9x9 with 11 mines', () => {
      expect(
        incrementNeibours(
          [5, 4],
          [
            [9, 2, 9, 1, 0, 0, 1, 1, 1],
            [1, 2, 2, 2, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 9, 1, 0, 0, 0],
            [0, 2, 2, 3, 9, 1, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 1, 9, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 1],
          ]
        )
      ).toStrictEqual([
        [9, 2, 9, 1, 0, 0, 1, 1, 1],
        [1, 2, 2, 2, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 1, 0, 1, 9, 1],
        [0, 1, 1, 2, 2, 9, 1, 1, 1],
        [0, 1, 9, 3, 9, 2, 0, 0, 0],
        [0, 2, 2, 4, 9, 2, 1, 1, 1],
        [0, 1, 9, 2, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1],
      ]);
    });
  });
});
