import { renderHook, act } from '@testing-library/react-hooks';

import { useStatus } from './useStatus';

describe('useGameStatus test cases', () => {
  it('Check default state', () => {
    const { result } = renderHook(useStatus);

    const { isGameStarted, isWin, isGameOver } = result.current;

    expect({ isGameStarted, isWin, isGameOver }).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: false,
    });
  });
  it('Check setNewGame handler', () => {
    const { result } = renderHook(useStatus);

    act(() => result.current.setNewGame());

    const { isGameStarted, isWin, isGameOver } = result.current;

    expect({ isGameStarted, isWin, isGameOver }).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: false,
    });
  });
  it('Check setInProgress handler', () => {
    const { result } = renderHook(useStatus);

    act(() => result.current.setInProgress());

    const { isGameStarted, isWin, isGameOver } = result.current;

    expect({ isGameStarted, isWin, isGameOver }).toEqual({
      isGameStarted: true,
      isWin: false,
      isGameOver: false,
    });
  });
  it('Check setGameWin handler', () => {
    const { result } = renderHook(useStatus);

    act(() => result.current.setGameWin());

    const { isGameStarted, isWin, isGameOver } = result.current;

    expect({ isGameStarted, isWin, isGameOver }).toEqual({
      isGameStarted: false,
      isWin: true,
      isGameOver: true,
    });
  });
  it('Check setGameLoose handler', () => {
    const { result } = renderHook(useStatus);

    act(() => result.current.setGameLoose());

    const { isGameStarted, isWin, isGameOver } = result.current;

    expect({ isGameStarted, isWin, isGameOver }).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: true,
    });
  });
  it('Full game statuses flow', () => {
    const { result } = renderHook(useStatus);

    act(() => result.current.setInProgress());

    expect({
      isGameStarted: result.current.isGameStarted,
      isWin: result.current.isWin,
      isGameOver: result.current.isGameOver,
    }).toEqual({
      isGameStarted: true,
      isWin: false,
      isGameOver: false,
    });

    act(() => result.current.setGameWin());

    expect({
      isGameStarted: result.current.isGameStarted,
      isWin: result.current.isWin,
      isGameOver: result.current.isGameOver,
    }).toEqual({
      isGameStarted: false,
      isWin: true,
      isGameOver: true,
    });

    act(() => result.current.setGameLoose());

    expect({
      isGameStarted: result.current.isGameStarted,
      isWin: result.current.isWin,
      isGameOver: result.current.isGameOver,
    }).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: true,
    });

    act(() => result.current.setNewGame());

    expect({
      isGameStarted: result.current.isGameStarted,
      isWin: result.current.isWin,
      isGameOver: result.current.isGameOver,
    }).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: false,
    });
  });
});
