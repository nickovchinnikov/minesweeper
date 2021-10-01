import { useState } from 'react';

export interface Return {
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  setGameWin: () => void;
  setGameLoose: () => void;
  setInProgress: () => void;
  setNewGame: () => void;
}

export enum GameStatuses {
  NewGame,
  InProgress,
  Win,
  Loose,
}

export const useStatus = (): Return => {
  const { NewGame, InProgress, Win, Loose } = GameStatuses;

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const setGameStatus = (status: GameStatuses) => {
    setIsGameStarted(status === InProgress);
    setIsWin(status === Win);
    setIsGameOver([Win, Loose].includes(status));
  };

  const setNewGame = () => setGameStatus(NewGame);

  const setInProgress = () => setGameStatus(InProgress);

  const setGameWin = () => setGameStatus(Win);

  const setGameLoose = () => setGameStatus(Loose);

  return {
    isGameStarted,
    isWin,
    isGameOver,
    setNewGame,
    setInProgress,
    setGameWin,
    setGameLoose,
  };
};
