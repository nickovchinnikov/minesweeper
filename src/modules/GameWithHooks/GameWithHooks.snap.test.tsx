import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { GameWithHooks } from './GameWithHooks';

it('Render game field by default', () => {
  const { asFragment } = render(<GameWithHooks />);
  userEvent.click(screen.getByTestId('0,0'), { button: 2 });
  expect(asFragment()).toMatchSnapshot();
  userEvent.click(screen.getByTestId('8,8'), { button: 2 });
  expect(asFragment()).toMatchSnapshot();
});
