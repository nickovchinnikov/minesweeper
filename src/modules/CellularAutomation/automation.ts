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
  width: number;
  height: number;
  speed: number;
  isPlaying: boolean;
  field: Field;
  rule: Rules;
}

export const getInitialState = (): State => ({
  width: 500,
  height: 500,
  speed: 500,
  isPlaying: false,
  rule: 'Hash',
  field: randomFill(500, 500),
});

export const automationSlice = createSlice({
  name: 'automation',
  initialState: getInitialState(),
  reducers: {
    nextFieldState: (state) => {
      const { rule, field, height, width } = state;
      state.field = transitionFill(rule, field, height, width);
    },
    isPlayingToggle: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    changeRule: (state, { payload }: PayloadAction<Rules>) => {
      state.rule = payload;
    },
    changeSpeed: (state, { payload }: PayloadAction<number>) => {
      state.speed = payload;
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
