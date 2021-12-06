import { actions, reducer, getInitialState } from './automation';

import { transitionFill } from './filling';

jest.mock('./filling', () => ({
  __esModule: true,
  ...jest.requireActual('./filling'),
  transitionFill: jest.fn(),
}));

describe('Automation slice test', () => {
  const initialState = getInitialState();

  it('Check nextCellsState action', () => {
    const mockTransitionFill = jest.fn();
    (transitionFill as jest.Mock).mockImplementation(mockTransitionFill);

    reducer(initialState, actions.nextFieldState());

    expect(mockTransitionFill).toHaveBeenCalled();
  });

  it('Change size action check', () => {
    expect(reducer(initialState, actions.changeSize(120))).toEqual(
      expect.objectContaining({
        size: 120,
      })
    );
  });
  it('Reset action check', () => {
    expect(reducer(initialState, actions.reset())).toEqual(
      expect.objectContaining({
        isPlaying: false,
      })
    );
  });
  it('Change speed action check', () => {
    expect(reducer(initialState, actions.changeSpeed('slow'))).toEqual(
      expect.objectContaining({
        speed: 100,
      })
    );
  });
  it('Change rule action check', () => {
    expect(reducer(initialState, actions.changeRule('Venus'))).toEqual(
      expect.objectContaining({
        rule: 'Venus',
      })
    );
  });
  it('isPlayingToggle action check', () => {
    expect(reducer(initialState, actions.isPlayingToggle())).toEqual(
      expect.objectContaining({
        isPlaying: true,
      })
    );
    expect(
      reducer({ ...initialState, isPlaying: true }, actions.isPlayingToggle())
    ).toEqual(
      expect.objectContaining({
        isPlaying: false,
      })
    );
  });
});
