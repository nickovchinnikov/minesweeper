import { CellState, Field } from './Field';
import { detectSolvedPuzzle } from './DetectSolvedPullze';

const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

describe('Detect solved puzzle function test cases', () => {
  it('Simplest 3*3 case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, e],
      [f, 1, e],
      [1, 1, e],
    ];

    const newPlayerField = detectSolvedPuzzle(playerField, gameField);

    expect(newPlayerField).toStrictEqual(gameField);
  });
  it('Wrong 3*3 cell with weak flag case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, e],
      [w, 1, e],
      [1, 1, e],
    ];

    const newPlayerField = detectSolvedPuzzle(playerField, gameField);

    expect(newPlayerField).toStrictEqual(playerField);
  });
  it('Wrong 3*3 hidden cells case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, h],
      [h, 1, h],
      [1, 1, h],
    ];

    const newPlayerField = detectSolvedPuzzle(playerField, gameField);

    expect(newPlayerField).toStrictEqual(playerField);
  });
  it('Wrong 3*3 hidden cell case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, h, e],
      [f, 1, e],
      [1, 1, e],
    ];

    const newPlayerField = detectSolvedPuzzle(playerField, gameField);

    expect(newPlayerField).toStrictEqual(playerField);
  });
  it('5*5 with hidden cells', () => {
    const gameField: Field = [
      [9, 9, 1, 1, 2],
      [9, 3, 1, 0, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 1, 9],
      [2, 1, 0, 1, 0],
    ];

    const playerField: Field = [
      [f, f, 1, h, h],
      [f, 3, 1, h, h],
      [1, 1, h, h, h],
      [1, h, h, h, h],
      [2, h, h, h, h],
    ];

    const newPlayerField = detectSolvedPuzzle(playerField, gameField);

    expect(newPlayerField).toStrictEqual(playerField);
  });
  it('5*5 solved case', () => {
    const gameField: Field = [
      [9, 9, 1, 1, 2],
      [9, 3, 1, 0, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 1, 9],
      [2, 1, 0, 1, 0],
    ];

    const playerField: Field = [
      [f, f, 1, 1, 2],
      [f, 3, 1, 0, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 1, f],
      [2, 1, 0, 1, 0],
    ];

    const newPlayerField = detectSolvedPuzzle(playerField, gameField);

    expect(newPlayerField).toStrictEqual(gameField);
  });
});
