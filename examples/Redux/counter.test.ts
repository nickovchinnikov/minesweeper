import { initialState, reducer, increment, decrement } from './counter';

describe('Counter redux module test', () => {
  it('Default init with increment action', async () => {
    expect(reducer(initialState, increment())).toBe(1);
  });
  it('Init with value decrement action', async () => {
    expect(reducer(10, decrement())).toBe(9);
  });
});
