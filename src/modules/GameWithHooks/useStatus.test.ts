import { renderHook, act } from '@testing-library/react-hooks';

import { useStatus, Return } from './useStatus';

const getDataFromUseStatusReturn = ({
  isGameStarted,
  isWin,
  isGameOver,
}: Return) => ({ isGameStarted, isWin, isGameOver });

describe('useGameStatus test cases', () => {
  it('Check default state', () => {
    const { result } = renderHook(useStatus);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: false,
    });
  });
  it('Check setNewGame handler', () => {
    const { result } = renderHook(useStatus);

    act(result.current.setNewGame);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: false,
    });
  });
  it('Check setInProgress handler', () => {
    const { result } = renderHook(useStatus);

    act(result.current.setInProgress);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: true,
      isWin: false,
      isGameOver: false,
    });
  });
  it('Check setGameWin handler', () => {
    const { result } = renderHook(useStatus);

    act(result.current.setGameWin);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: true,
      isGameOver: true,
    });
  });
  it('Check setGameLoose handler', () => {
    const { result } = renderHook(useStatus);

    act(result.current.setGameLoose);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: true,
    });
  });
  it('Full game statuses flow', () => {
    const { result } = renderHook(useStatus);

    act(result.current.setInProgress);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: true,
      isWin: false,
      isGameOver: false,
    });

    act(result.current.setGameWin);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: true,
      isGameOver: true,
    });

    act(result.current.setGameLoose);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: true,
    });

    act(result.current.setNewGame);

    expect(getDataFromUseStatusReturn(result.current)).toEqual({
      isGameStarted: false,
      isWin: false,
      isGameOver: false,
    });
  });
});
