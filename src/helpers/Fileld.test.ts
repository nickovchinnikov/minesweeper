import {
  generateFieldWithDefaultState,
  fieldGenerator,
  CellState,
  Cell,
} from './Field';

const { empty: e, bomb: b, hidden: h } = CellState;

const cellWithBombFilter = (cell: Cell) => cell === b;

describe('Field Generator', () => {
  describe('emptyFieldGenerator tests', () => {
    it('2x2', () => {
      expect(generateFieldWithDefaultState(2)).toStrictEqual([
        [e, e],
        [e, e],
      ]);
    });
    it('3x3', () =>
      expect(generateFieldWithDefaultState(3)).toStrictEqual([
        [e, e, e],
        [e, e, e],
        [e, e, e],
      ]));
    it('3x3 with hidden state', () =>
      expect(generateFieldWithDefaultState(3, h)).toStrictEqual([
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ]));
  });
  describe('Simple cases', () => {
    it('Wrong dencity', () => {
      const errorText = 'Probability must be between 0 and 1';
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    it('Smallest possible field without mine', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[e]]);
    });
    it('Big field without mine', () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e],
      ]);
    });
    it('Smallest possible field with mine', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[b]]);
    });
    it('2x2 field with mines', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [b, b],
        [b, b],
      ]);
    });
    it('2x2 field with 50% probability', () => {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();

      const cellsWithBombs = flatField.filter(cellWithBombFilter);
      const emptyCells = flatField.filter((cell: Cell) => cell === 2);

      expect(cellsWithBombs).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });
    it('Real game field size = 10x10 with 1/4 mined cells (25 mines)', () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      const flatField = field.flat();

      expect([...field[0], ...field[1]].join('')).not.toBe(
        '99999999999999999999'
      );

      expect(flatField.filter(cellWithBombFilter)).toHaveLength(mines);
    });
  });
});
