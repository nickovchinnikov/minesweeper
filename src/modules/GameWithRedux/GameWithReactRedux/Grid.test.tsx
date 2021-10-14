import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '@/store';

import { Grid } from './Grid';

it('Grid renders correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Grid />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
