import { useState, useCallback } from 'react';

import {
  Field,
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
  Coords,
} from '@/core/Field';
import { openCell } from '@/core/openCell';
import { setFlag } from '@/core/setFlag';

import { LevelNames, GameSettings } from '@/modules/GameSettings';

import { useTime } from './useTime';

interface ReturnType {
  level: LevelNames;
  time: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  flagCounter: number;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords, flagCounter: number, bombs: number) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
}

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>('beginner');

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [flagCounter, setFlagCounter] = useState(0);
  const [time, resetTime] = useTime(isGameStarted, isGameOver);

  const setGameOver = (isSolved = false) => {
    setIsGameOver(true);
    setIsWin(isSolved);
  };

  const [size, bombs] = GameSettings[level];

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  );

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  );

  const onClick = useCallback(
    (coords: Coords) => {
      !isGameStarted && setIsGameStarted(true);
      try {
        const [newPlayerField, isSolved] = openCell(
          coords,
          playerField,
          gameField
        );
        if (isSolved) {
          setGameOver(isSolved);
        }
        setPlayerField([...newPlayerField]);
      } catch (e) {
        setPlayerField([...gameField]);
        setGameOver();
      }
    },
    [isGameStarted, level]
  );

  const onContextMenu = useCallback(
    (coords: Coords, flagCounter: number, bombs: number) => {
      !isGameStarted && setIsGameStarted(true);
      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        coords,
        playerField,
        gameField,
        flagCounter,
        bombs
      );
      setFlagCounter(newFlagCounter);
      if (isSolved) {
        setGameOver(isSolved);
      }
      setPlayerField([...newPlayerField]);
    },
    [isGameStarted, level]
  );

  const resetHandler = useCallback(([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = generateFieldWithDefaultState(
      size,
      CellState.hidden
    );

    setGameField([...newGameField]);
    setPlayerField([...newPlayerField]);
    setIsGameOver(false);
    setIsWin(false);
    setIsGameStarted(false);
    setFlagCounter(0);
    resetTime();
  }, []);

  const onChangeLevel = useCallback((level: LevelNames) => {
    setLevel(level);
    const newSettings = GameSettings[level];
    resetHandler(newSettings);
  }, []);

  const onReset = useCallback(
    () => resetHandler([size, bombs]),
    [size, bombs, resetHandler]
  );

  return {
    level,
    time,
    isGameOver,
    isGameStarted,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset,
  };
};
