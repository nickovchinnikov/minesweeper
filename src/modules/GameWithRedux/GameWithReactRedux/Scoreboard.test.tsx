import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '@/store';

import { Scoreboard } from './Scoreboard';

it('Scoreboard renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Scoreboard />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
