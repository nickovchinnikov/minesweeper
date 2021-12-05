import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  width: 300,
  height: 300,
  speed: 50,
  isPlaying: false,
  rule: 'Demons',
  field: randomFill(300, 300),
});

export const automationSlice = createSlice({
  name: 'automation',
  initialState: getInitialState(),
  reducers: {
    nextFieldState: (state) => {
      const { rule, field, height, width } = state;
      state.field = transitionFill(rule, field, height, width);
    },
    timerToggle: (state) => {
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
