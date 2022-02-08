import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '@/store';

import { GameWithReactRedux } from './GameWithReactRedux';

jest.mock('@/hooks/useQuery', () => ({
  __esModule: true,
  useQuery: () => ({ get: () => null }),
}));

it('GameWithReactRedux renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <GameWithReactRedux />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
