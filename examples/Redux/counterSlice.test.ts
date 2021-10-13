import { reducer, actions, initialState } from './counterSlice';

describe('Counter redux module test', () => {
  it('Default init with increment action', async () => {
    expect(reducer(initialState, actions.increment())).toBe(1);
  });
  it('Init with value decrement action', async () => {
    expect(reducer(10, actions.decrement())).toBe(9);
  });
});
