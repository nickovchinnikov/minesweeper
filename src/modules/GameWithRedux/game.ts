import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit';

import {
  Field,
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
  Coords,
} from '@/core/Field';
import { LevelNames, GameSettings } from '@/modules/GameSettings';
import { openCell as openCellHandler } from '@/core/openCell';
import { setFlag } from '@/core/setFlag';
import { RootState } from '@/store';

export interface State {
  level: LevelNames;
  time: number;
  bombs: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  isTimerRunning: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  flagCounter: number;
}

export const getInitialState = (level: LevelNames = 'beginner'): State => {
  const settings = GameSettings[level];
  const [size, bombs] = settings;

  return {
    level,
    time: 0,
    bombs,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    isTimerRunning: false,
    settings,
    flagCounter: 0,
    playerField: generateFieldWithDefaultState(size, CellState.hidden),
    gameField: fieldGenerator(size, bombs / (size * size)),
  };
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    openCell: (state, { payload }: PayloadAction<Coords>) => {
      const { playerField, gameField } = state;
      try {
        const [newPlayerField, isSolved] = openCellHandler(
          payload,
          playerField,
          gameField
        );
        state.isGameStarted = !isSolved;
        state.isGameOver = isSolved;
        state.isWin = isSolved;
        state.playerField = newPlayerField;
      } catch (error) {
        state.isGameStarted = false;
        state.isGameOver = true;
        state.isWin = false;
        state.playerField = gameField;
      }
    },
    setFlag: (state, { payload }: PayloadAction<Coords>) => {
      const { playerField, gameField, flagCounter, bombs } = state;

      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        payload,
        playerField,
        gameField,
        flagCounter,
        bombs
      );
      state.isGameStarted = !isSolved;
      state.isGameOver = isSolved;
      state.isWin = isSolved;
      state.flagCounter = newFlagCounter;
      state.playerField = newPlayerField;
    },
    updateTime: (state) => {
      state.time = state.time + 1;
    },
    setTimerActive: (state) => {
      state.isTimerRunning = true;
    },
    reset: ({ level }) => getInitialState(level),
    changeLevel: (state, { payload }: PayloadAction<LevelNames>) =>
      getInitialState(payload),
  },
});

export const { actions, reducer } = gameSlice;

export const recursiveUpdate =
  (prevGameField: Field): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) =>
    setTimeout(() => {
      const { isGameStarted, isTimerRunning, gameField } = getState().game;
      const isTheSameGame = gameField === prevGameField;

      if (isGameStarted && isTimerRunning && isTheSameGame) {
        dispatch(actions.updateTime());
        dispatch(recursiveUpdate(gameField));
      }
    }, 1000);

export const runTimer =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { isGameStarted, isTimerRunning, gameField } = getState().game;
    if (isGameStarted && !isTimerRunning) {
      dispatch(actions.setTimerActive());
      dispatch(recursiveUpdate(gameField));
    }
  };
