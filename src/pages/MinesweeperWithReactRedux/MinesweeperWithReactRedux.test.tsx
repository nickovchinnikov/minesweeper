import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '@/store';

import { MinesweeperWithReactRedux } from './MinesweeperWithReactRedux';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue([
    {
      get: () => null,
    },
    jest.fn(),
  ]),
}));

it('MinesweeperWithReactRedux renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MinesweeperWithReactRedux />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
