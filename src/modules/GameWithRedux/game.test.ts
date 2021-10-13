import { GameSettings } from '@/modules/GameSettings';
import { CellState, Field } from '@/core/Field';

const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

import { reducer, openCell, State } from './game';

describe('Game reducer', () => {
  const level = 'beginner';
  const baseInitialState: State = {
    level,
    time: 0,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    settings: GameSettings[level],
    bombs: 0,
    flagCounter: 0,
    gameField: [
      [9, 1],
      [1, 1],
    ],
    playerField: [
      [h, h],
      [h, h],
    ],
  };

  describe('Action openCell simple case', () => {
    it('Check openCell to cell with a number', () => {
      expect(reducer(baseInitialState, openCell([1, 1]))).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        playerField: [
          [h, h],
          [h, 1],
        ],
      });
    });
    it('Check openCell to cell with a bomb', () => {
      expect(reducer(baseInitialState, openCell([0, 0]))).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: false,
        isGameOver: true,
        playerField: baseInitialState.gameField,
      });
    });
    it('Check openCell to cell with a flag', () => {
      const playerFieldWithFlag = [
        [h, h],
        [h, f],
      ] as Field;
      expect(
        reducer(
          {
            ...baseInitialState,
            isGameStarted: true,
            playerField: playerFieldWithFlag,
          },
          openCell([1, 1])
        )
      ).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        playerField: playerFieldWithFlag,
      });
    });
  });
});
