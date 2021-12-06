import { Rules, Cell, Field } from './types';
import { hashRule, demonsRule, venusRule } from './transitions';

export const colors: string[] = [
  '#113',
  '#014',
  '#b16',
  '#54f',
  '#74f',
  '#fff',
  '#add',
  '#4fc',
  '#185',
  '#8c4',
  '#ef6',
  '#4bd',
  '#27f',
  '#33f',
  '#059',
  '#567',
];

export const getColor = (state: Cell) => colors[state];

export const stateColors: number[][] = colors.map((color) => [
  parseInt(color.charAt(1) + color.charAt(1), 16),
  parseInt(color.charAt(2) + color.charAt(2), 16),
  parseInt(color.charAt(3) + color.charAt(3), 16),
  255,
]);

export const getStateColors = (state: Cell) => stateColors[state];

export function randomFill(
  height: number,
  width: number,
  states = colors.length
): Field {
  const result: Field = [];
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      const cell: Cell = Math.floor(Math.random() * states) as Cell;
      row[x] = cell;
    }
    result[y] = row;
  }
  return result;
}

export function transitionFill(
  rule: Rules,
  field: Field,
  height: number,
  width: number,
  states = colors.length
): Field {
  return field.map((row, y, arr) =>
    row.map((cell, x) => {
      const neighbors = {
        top: arr[(y + 1) % height][x],
        right: arr[y][(x + 1) % width],
        bottom: arr[(y + height - 1) % height][x],
        left: arr[y][(x + width - 1) % width],
        rightTop: arr[(y + 1) % height][(x + 1) % width],
        rightBottom: arr[(y + height - 1) % height][(x + 1) % width],
        leftBottom: arr[(y + height - 1) % height][(x + width - 1) % width],
        leftTop: arr[(y + 1) % height][(x + width - 1) % width],
      };
      // CHANGE CELL STATE VIA SELECTED RULE
      if (rule === 'Hash') {
        return hashRule(cell, neighbors, states);
      }
      if (rule === 'Demons') {
        return demonsRule(cell, neighbors, states);
      }
      return venusRule(cell, neighbors);
    })
  );
}
