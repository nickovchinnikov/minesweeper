import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GameOver } from './GameOver';

describe('Game Over test cases', () => {
  it('GameOver render win correctly', () => {
    const onReset = jest.fn();

    const { asFragment } = render(<GameOver onClick={onReset} isWin={true} />);

    const element = screen.getByText('😎');

    expect(element).toBeInTheDocument();

    userEvent.click(element);

    expect(onReset).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
  it('GameOver render fail correctly', () => {
    const onReset = jest.fn();

    const { asFragment } = render(<GameOver onClick={onReset} isWin={false} />);

    const element = screen.getByText('🙁');

    expect(element).toBeInTheDocument();

    userEvent.click(element);

    expect(onReset).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});
