import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit';

import { RootState } from '@/store';

import { randomFill, transitionFill } from './filling';
import { Field, Rules } from './types';

export interface State {
  size: number;
  speed: number;
  isPlaying: boolean;
  field: Field;
  rule: Rules;
}

export const getInitialState = (rule: Rules = 'Hash', size = 100): State => ({
  size: size,
  speed: 0,
  isPlaying: false,
  rule,
  field: randomFill(size, size),
});

export type Size = 50 | 100 | 120;

export type Speed = 'fast' | 'normal' | 'slow';

export const speed: Record<Speed, number> = {
  fast: 0,
  normal: 50,
  slow: 100,
};

export const automationSlice = createSlice({
  name: 'automation',
  initialState: getInitialState(),
  reducers: {
    changeSize: (state, { payload }: PayloadAction<Size>) => {
      const newState = getInitialState(state.rule, payload);
      newState.isPlaying = true;
      return newState;
    },
    changeRule: (state, { payload }: PayloadAction<Rules>) => {
      const newState = getInitialState(payload, state.size);
      newState.isPlaying = true;
      return newState;
    },
    reset: (state) => {
      return getInitialState(state.rule, state.size);
    },
    nextFieldState: (state) => {
      const { rule, field, size } = state;
      state.field = transitionFill(rule, field, size, size);
    },
    isPlayingToggle: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    changeSpeed: (state, { payload }: PayloadAction<Speed>) => {
      state.speed = speed[payload];
    },
  },
});

export const { actions, reducer } = automationSlice;

export const recursiveUpdate =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { speed, isPlaying } = getState().automation;

    if (isPlaying) {
      setTimeout(() => {
        dispatch(actions.nextFieldState());
        dispatch(recursiveUpdate());
      }, speed);
    }
  };

export const runGeneration =
  (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
    dispatch(recursiveUpdate());
  };
