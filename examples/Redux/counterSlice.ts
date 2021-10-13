import { createSlice } from '@reduxjs/toolkit';

export const initialState = 0;

const { reducer, actions } = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export { reducer, actions };
