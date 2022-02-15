import React from 'react';
import { Provider } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { render } from '@testing-library/react';

import { store } from '@/store';

import { GameWithReactRedux } from './GameWithReactRedux';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

(useSearchParams as jest.Mock).mockReturnValue([
  { get: () => null },
  jest.fn(),
]);

it('GameWithReactRedux renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <GameWithReactRedux />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
