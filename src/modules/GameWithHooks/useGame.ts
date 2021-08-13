import { useState } from 'react';

import {
  Field,
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
  Coords,
} from '@/helpers/Field';
import { openCell } from '@/helpers/CellsManipulator';

import { LevelNames, GameSettings } from '@/modules/GameSettings';

interface ReturnType {
  level: LevelNames;
  isGameOver: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  onClick: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
}

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>('beginner');

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const [size, bombs] = GameSettings[level];

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  );

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  );

  const onClick = (coords: Coords) => {
    try {
      const newPlayerField = openCell(coords, playerField, gameField);
      setPlayerField([...newPlayerField]);
    } catch (e) {
      setPlayerField([...gameField]);
      setIsGameOver(true);
    }
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
  };

  const onChangeLevel = (level: LevelNames) => {
    setLevel(level);
    const newSettings = GameSettings[level];
    resetHandler(newSettings);
  };

  const onReset = () => resetHandler([size, bombs]);

  return {
    level,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    onClick,
    onChangeLevel,
    onReset,
  };
};
