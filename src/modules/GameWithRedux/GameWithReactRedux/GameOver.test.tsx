import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '@/store';

import { GameOver } from './GameOver';

it('GameOver renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <GameOver />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
