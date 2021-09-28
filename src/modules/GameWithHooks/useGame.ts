import { useState, useEffect } from 'react';

import {
  Field,
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
  Coords,
} from '@/helpers/Field';
import { openCell } from '@/helpers/openCell';
import { setFlag } from '@/helpers/setFlag';

import { LevelNames, GameSettings } from '@/modules/GameSettings';

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
  onContextMenu: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
}

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>('beginner');

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [time, setTime] = useState(0);
  const [flagCounter, setFlagCounter] = useState(0);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      if (isGameOver) {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameOver, isGameStarted, time]);

  const onClick = (coords: Coords) => {
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
  };

  const onContextMenu = (coords: Coords) => {
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
  };

  const resetHandler = ([size, bombs]: [number, number]) => {
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
    setTime(0);
    setFlagCounter(0);
  };

  const onChangeLevel = (level: LevelNames) => {
    setLevel(level);
    const newSettings = GameSettings[level];
    resetHandler(newSettings);
  };

  const onReset = () => resetHandler([size, bombs]);

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
