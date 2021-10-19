import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { store } from '@/store';

import { Grid } from './Grid';

jest.mock('@/core/Field');

describe('Grid test cases', () => {
  it('Check Grid callbacks', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByTestId('0,0'));
    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByTestId('8,8'), { button: 2 });
    expect(asFragment()).toMatchSnapshot();
  });
});
