import { renderHook, act } from '@testing-library/react-hooks';

import { CellState, Field } from '@/core/Field';
import { GameLevels, GameSettings } from '@/modules/GameSettings';

import { useGame } from './useGame';

jest.mock('@/core/Field');

const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

const [beginner, intermediate, expert, maestro] = GameLevels;

const flatWithFilter = (field: Field, cond: number) =>
  field.flat().filter((v) => v === cond);

describe('useGame test cases', () => {
  describe('Render behaviour', () => {
    it('Render hook by default', () => {
      const { result } = renderHook(useGame);
      const { level, isGameOver, isWin, settings, playerField, gameField } =
        result.current;

      expect({ level, isGameOver, isWin, settings }).toStrictEqual({
        level: beginner,
        isGameOver: false,
        isWin: false,
        settings: GameSettings.beginner,
      });
      expect(playerField).toHaveLength(9);
      expect(flatWithFilter(gameField, b)).toHaveLength(10);
    });
    it('onChange game level handler', () => {
      const { result } = renderHook(useGame);
      const { playerField: beginnerPlayerField, onChangeLevel } =
        result.current;

      expect(beginnerPlayerField).toHaveLength(9);

      act(() => onChangeLevel(intermediate));

      const { playerField: intermediatePlayerField } = result.current;

      expect(intermediatePlayerField).toHaveLength(16);

      act(() => onChangeLevel(expert));

      const { playerField: expertPlayerField } = result.current;

      expect(expertPlayerField).toHaveLength(22);

      act(() => onChangeLevel(maestro));

      const { playerField: maestroPlayerField } = result.current;

      expect(maestroPlayerField).toHaveLength(30);
    });
  });
  describe('Open cell test cases', () => {
    it('Open empty cell on the beginner level', () => {
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      expect(playerField).toHaveLength(9);
      expect(flatWithFilter(playerField, e)).toHaveLength(0);

      act(() => onClick([0, 0]));

      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, e)).toHaveLength(18);
    });
    it('Context menu handler', () => {
      const { result } = renderHook(useGame);

      const { onContextMenu } = result.current;

      act(() =>
        onContextMenu(
          [0, 0],
          result.current.flagCounter,
          result.current.settings[1]
        )
      );

      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, f)).toHaveLength(1);
    });
    it('Click to the non-empty cells area', () => {
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      expect(flatWithFilter(playerField, 1)).toHaveLength(0);

      act(() => onClick([0, 8]));

      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, 1)).toHaveLength(1);
    });
  });
  describe('OnClick with OnChangeGameLevel', () => {
    it('Check click to the cell when the level is changed', () => {
      const { result } = renderHook(useGame);

      expect(result.current.playerField).toHaveLength(9);

      act(() => result.current.onChangeLevel(intermediate));

      act(() => result.current.onClick([15, 15]));

      expect(result.current.playerField).toHaveLength(16);
      expect(flatWithFilter(result.current.playerField, e)).toHaveLength(2);

      act(() => result.current.onChangeLevel(expert));

      act(() => result.current.onClick([21, 21]));

      expect(result.current.playerField).toHaveLength(22);
      expect(flatWithFilter(result.current.playerField, e)).toHaveLength(1);
      expect(flatWithFilter(result.current.playerField, 1)).toHaveLength(2);
      expect(flatWithFilter(result.current.playerField, 2)).toHaveLength(1);
    });
    it('onReset game handler', () => {
      const { result } = renderHook(useGame);
      const { playerField, onClick, onReset, onContextMenu } = result.current;

      expect(playerField).toHaveLength(9);

      act(() => onClick([0, 8]));
      act(() =>
        onContextMenu(
          [8, 8],
          result.current.flagCounter,
          result.current.settings[1]
        )
      );

      expect(flatWithFilter(playerField, 1)).toHaveLength(1);

      act(() => onClick([0, 0]));
      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, e)).toHaveLength(18);

      act(onReset);
      const {
        playerField: finalPlayerField,
        isWin,
        isGameStarted,
        isGameOver,
        gameField,
        flagCounter,
      } = result.current;

      expect(isWin).toBe(false);
      expect(isGameOver).toBe(false);
      expect(isGameStarted).toBe(false);
      expect(flagCounter).toBe(0);
      expect(flatWithFilter(finalPlayerField, h)).toHaveLength(81);
      expect(flatWithFilter(gameField, b)).toHaveLength(10);
    });
  });
  describe('Game over behavior', () => {
    it('Player loose the game', () => {
      jest.useFakeTimers();
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      act(() => onClick([0, 8]));

      const timeMustPass = 5;

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(5);

      expect(flatWithFilter(playerField, 1)).toHaveLength(1);

      act(() => onClick([0, 0]));

      expect(flatWithFilter(playerField, e)).toHaveLength(18);

      act(() => onClick([0, 7]));

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      const {
        isWin,
        isGameOver,
        time,
        playerField: newPlayerField,
        onReset,
      } = result.current;

      expect(time).toBe(5);
      expect(isGameOver).toBe(true);
      expect(isWin).toBe(false);
      expect(flatWithFilter(newPlayerField, h)).toHaveLength(0);
      expect(flatWithFilter(newPlayerField, e)).toHaveLength(27);
      expect(flatWithFilter(newPlayerField, 1)).toHaveLength(30);
      expect(flatWithFilter(newPlayerField, 2)).toHaveLength(12);
      expect(flatWithFilter(newPlayerField, 3)).toHaveLength(2);

      act(onReset);
      const { playerField: latestPlayerField } = result.current;

      expect(flatWithFilter(latestPlayerField, h)).toHaveLength(81);
    });
    it('Player win a game when open the last cell', () => {
      const { result } = renderHook(useGame);

      const { gameField, onClick, onContextMenu } = result.current;

      for (const y of gameField.keys()) {
        for (const x of gameField[y].keys()) {
          const gameCell = gameField[y][x];
          act(() => {
            gameCell === b &&
              onContextMenu(
                [y, x],
                result.current.flagCounter,
                result.current.settings[1]
              );
          });
        }
      }

      for (const y of gameField.keys()) {
        for (const x of gameField[y].keys()) {
          const gameCell = gameField[y][x];
          act(() => {
            gameCell !== b && onClick([y, x]);
          });
        }
      }

      const { isGameOver, isWin } = result.current;

      expect(isWin).toBe(true);
      expect(isGameOver).toBe(true);
    });
    it('Player win the game when setup flag to the last cell', () => {
      const { result } = renderHook(useGame);

      const { gameField, onClick, onContextMenu } = result.current;

      for (const y of gameField.keys()) {
        for (const x of gameField[y].keys()) {
          const gameCell = gameField[y][x];
          act(() => {
            gameCell !== b && onClick([y, x]);
          });
        }
      }

      for (const y of gameField.keys()) {
        for (const x of gameField[y].keys()) {
          const gameCell = gameField[y][x];
          act(() => {
            gameCell === b &&
              onContextMenu(
                [y, x],
                result.current.flagCounter,
                result.current.settings[1]
              );
          });
        }
      }

      const { isGameOver, isWin } = result.current;

      expect(isWin).toBe(true);
      expect(isGameOver).toBe(true);
    });
  });
  describe('Scoreboard behavior - timer and bomb counter', () => {
    it('Timer should start by click to a cell', () => {
      jest.useFakeTimers();

      const { result } = renderHook(useGame);

      const timeMustPass = 5;

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      // Timer shouldn't works before game has started
      expect(result.current.time).toBe(0);

      act(() => result.current.onClick([0, 0]));

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(5);
    });
    it('Timer should start by mark a cell by a flag', () => {
      jest.useFakeTimers();

      const { result } = renderHook(useGame);

      const timeMustPass = 5;

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      // Timer shouldn't works before game has started
      expect(result.current.time).toBe(0);

      act(() =>
        result.current.onContextMenu(
          [0, 0],
          result.current.flagCounter,
          result.current.settings[1]
        )
      );

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(timeMustPass);
    });
    it('Time should reset value when onReset have been called', () => {
      jest.useFakeTimers();

      const { result } = renderHook(useGame);

      expect(result.current.time).toBe(0);

      act(() =>
        result.current.onContextMenu(
          [0, 0],
          result.current.flagCounter,
          result.current.settings[1]
        )
      );

      const timeMustPass = 5;
      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(timeMustPass);

      act(result.current.onReset);

      expect(result.current.time).toBe(0);
    });
    it('flagCounter counter increase when onContextMenu calls', () => {
      const { result } = renderHook(useGame);

      act(() =>
        result.current.onContextMenu(
          [0, 0],
          result.current.flagCounter,
          result.current.settings[1]
        )
      );

      expect(result.current.flagCounter).toBe(1);
    });
    it('flagCounter counter should stop when flagCounter > bombs', () => {
      const { result } = renderHook(useGame);

      expect(result.current.time).toBe(0);

      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 4; x++) {
          act(() =>
            result.current.onContextMenu(
              [y, x],
              result.current.flagCounter,
              result.current.settings[1]
            )
          );
        }
      }

      expect(result.current.flagCounter).toBe(10);
    });
  });
});
