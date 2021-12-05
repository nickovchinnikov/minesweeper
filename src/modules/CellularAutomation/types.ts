const states = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;
export type Rules = 'Hash' | 'Demons' | 'Venus';
export type Cell = typeof states[number];
export type Field = Cell[][];

export interface Neighbours {
  top: Cell;
  right: Cell;
  bottom: Cell;
  left: Cell;
  rightTop: Cell;
  rightBottom: Cell;
  leftBottom: Cell;
  leftTop: Cell;
}
