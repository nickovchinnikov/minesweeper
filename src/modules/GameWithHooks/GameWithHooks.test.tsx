import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { CellState, Field } from '@/helpers/Field';

import { GameWithHooks } from './GameWithHooks';

const { empty: e, hidden: h, bomb: b } = CellState;

describe('Dynamic game with react-hooks', () => {
  const defautGameField: Field = [
    [b, b, 1, 1, 2],
    [b, 3, 1, e, e],
    [1, 1, e, 1, 1],
    [1, e, e, 1, b],
    [2, 1, e, 1, e],
  ];

  it('Renders correctly with default field', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
  it('Renders correctly with generated field', () => {
    const { asFragment } = render(<GameWithHooks />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell click handler', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    userEvent.click(screen.getByTestId('2,2'));

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell context menu handler', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });

    expect(asFragment()).toMatchSnapshot();
  });
  it('onReset handler', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });
    userEvent.click(screen.getByTestId('2,2'));

    userEvent.click(screen.getByRole('button'));

    expect(asFragment()).toMatchSnapshot();
  });
  it('onChange handler', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'expert');

    expect(asFragment()).toMatchSnapshot();
  });
});
