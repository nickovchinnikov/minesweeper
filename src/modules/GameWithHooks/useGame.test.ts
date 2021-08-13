import { renderHook, act } from '@testing-library/react-hooks';

import { CellState, Field } from '@/helpers/Field';
import { GameLevels, GameSettings } from '@/modules/GameSettings';

import { useGame } from './useGame';

jest.mock('@/helpers/Field');

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

const [beginner, intermediate, expert] = GameLevels;

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
      const { playerField, onChangeLevel } = result.current;

      expect(playerField).toHaveLength(9);

      act(() => onChangeLevel(intermediate));

      const {
        playerField: intermediatePlayerField,
        onClick: onClickIntermediate,
      } = result.current;

      act(() => onClickIntermediate([15, 15]));

      expect(intermediatePlayerField).toHaveLength(16);
      expect(flatWithFilter(intermediatePlayerField, e)).toHaveLength(2);

      act(() => onChangeLevel(expert));

      const { playerField: expertPlayerField, onClick: onClickExpert } =
        result.current;

      act(() => onClickExpert([21, 21]));

      expect(expertPlayerField).toHaveLength(22);
      expect(flatWithFilter(expertPlayerField, e)).toHaveLength(1);
      expect(flatWithFilter(expertPlayerField, 1)).toHaveLength(2);
      expect(flatWithFilter(expertPlayerField, 2)).toHaveLength(1);
    });
    it('onReset game handler', () => {
      const { result } = renderHook(useGame);
      const { playerField, onClick, onReset } = result.current;

      expect(playerField).toHaveLength(9);

      act(() => onClick([0, 8]));

      expect(flatWithFilter(playerField, 1)).toHaveLength(1);

      act(() => onClick([0, 0]));
      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, e)).toHaveLength(18);

      act(onReset);
      const {
        playerField: finalPlayerField,
        isWin,
        isGameOver,
        gameField,
      } = result.current;

      expect(isWin).toBe(false);
      expect(isGameOver).toBe(false);
      expect(flatWithFilter(finalPlayerField, h)).toHaveLength(81);
      expect(flatWithFilter(gameField, b)).toHaveLength(10);
    });
  });
  describe('Game over behavior', () => {
    it('Player loose the game', () => {
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      act(() => onClick([0, 8]));

      expect(flatWithFilter(playerField, 1)).toHaveLength(1);

      act(() => onClick([0, 0]));

      expect(flatWithFilter(playerField, e)).toHaveLength(18);

      act(() => onClick([0, 7]));

      const {
        isWin,
        isGameOver,
        playerField: newPlayerField,
        onReset,
      } = result.current;

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
  });
});
