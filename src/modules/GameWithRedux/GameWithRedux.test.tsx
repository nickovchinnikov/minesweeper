import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { GameWithRedux } from './GameWithRedux';

jest.mock('@/core/Field');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GameWithHooks test cases', () => {
  it('Render game field by default', () => {
    const { asFragment } = render(<GameWithRedux />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell click works fine', () => {
    const { asFragment } = render(<GameWithRedux />);
    userEvent.click(screen.getByTestId('0,0'));
    expect(asFragment()).toMatchSnapshot();
  });
  it('Context menu handler on a cell works fine', () => {
    const { asFragment } = render(<GameWithRedux />);
    userEvent.click(screen.getByTestId('0,0'), { button: 2 });
    expect(asFragment()).toMatchSnapshot();
  });
  it('Reset handler works fine', () => {
    const { asFragment } = render(<GameWithRedux />);
    userEvent.click(screen.getByTestId('0,0'));
    expect(asFragment()).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
  });
  it('Change level works fine', () => {
    const { asFragment } = render(<GameWithRedux />);
    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
    expect(asFragment()).toMatchSnapshot();
  });
  it('Game over reset the game state', () => {
    const { asFragment } = render(<GameWithRedux />);
    userEvent.click(screen.getByTestId('0,0'));
    expect(asFragment()).toMatchSnapshot();
    userEvent.click(screen.getByText('🙂'));
    expect(asFragment()).toMatchSnapshot();
  });
});
