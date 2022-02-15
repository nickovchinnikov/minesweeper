import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '@/store';

import { Scoreboard } from './Scoreboard';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

(useSearchParams as jest.Mock).mockReturnValue([
  { get: () => null },
  mockSetSearchParams,
]);

describe('Scoreboard test cases', () => {
  it('Scoreboard check', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockReturnValue({
      level: 'beginner',
      time: 0,
      bombs: 10,
      flagCounter: 3,
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Scoreboard />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
    expect(mockSetSearchParams).toHaveBeenCalledWith({ level: 'intermediate' });
    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByRole('button'));
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
