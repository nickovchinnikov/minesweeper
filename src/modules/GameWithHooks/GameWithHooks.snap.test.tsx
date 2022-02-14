import React from 'react';
import { useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { GameWithHooks } from './GameWithHooks';

const mockSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

(useSearchParams as jest.Mock).mockReturnValue([
  { get: () => null },
  mockSetSearchParams,
]);

it('Render game field by default', () => {
  const { asFragment } = render(<GameWithHooks />);
  userEvent.click(screen.getByTestId('0,0'), { button: 2 });
  expect(asFragment()).toMatchSnapshot();
  userEvent.click(screen.getByTestId('8,8'), { button: 2 });
  expect(asFragment()).toMatchSnapshot();
});
