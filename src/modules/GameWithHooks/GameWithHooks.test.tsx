import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

import { CellState, Field } from '@/helpers/Field';

import { GameWithHooks } from './GameWithHooks';

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

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

    expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(25);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Renders correctly with generated field', () => {
    const { asFragment } = render(<GameWithHooks />);

    expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(81);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell click handler to the empty cells area', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    userEvent.click(screen.getByTestId('2,2'));

    expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(6);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell click handler to the non-empty cells area', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    userEvent.click(screen.getByTestId('0,2'));

    expect(screen.getAllByText('1')).toHaveLength(1);

    userEvent.click(screen.getByTestId('0,4'));

    expect(screen.getAllByText('2')).toHaveLength(1);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell context menu handler', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });

    expect(screen.getByTestId('flag_0,0')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });

    expect(screen.getByTestId('weakFlag_0,0')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });

    expect(screen.queryByTestId('flag_0,0')).not.toBeInTheDocument();
    expect(screen.queryByTestId('weakFlag_0,0')).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
  it('onReset handler', () => {
    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });

    expect(screen.getByTestId('flag_0,0')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('2,2'));

    expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(6);

    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByTestId('flag_0,0')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('cell', { name: String(e) })
    ).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
  it('onChange handler', () => {
    const { asFragment } = render(<GameWithHooks />);

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'beginner');

    expect(screen.getAllByRole('cell')).toHaveLength(81);

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');

    expect(screen.getAllByRole('cell')).toHaveLength(256);

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'expert');

    expect(screen.getAllByRole('cell')).toHaveLength(484);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Check bomb counter', () => {
    render(<GameWithHooks defaultField={defautGameField} />);

    userEvent.click(screen.getByTestId('2,2'));
    userEvent.click(screen.getByTestId('4,4'));

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });
    userEvent.click(screen.getByTestId('0,1'), { button: 2 });

    expect(screen.getByText(8)).toBeInTheDocument();
  });
  it('Check timer has started by click', async () => {
    jest.useFakeTimers();

    render(<GameWithHooks defaultField={defautGameField} />);

    const timeShouldBePassed = 5;

    for (let i = 0; i < timeShouldBePassed; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    // Timer shouldn't works before game has started
    expect(screen.queryByText(timeShouldBePassed)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('4,4'));

    for (let i = 0; i < timeShouldBePassed; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(await screen.findByText(timeShouldBePassed)).toBeInTheDocument();
  });
  it('Check timer shpuld has started by mark a cell by flag', async () => {
    jest.useFakeTimers();

    render(<GameWithHooks defaultField={defautGameField} />);

    const timeShouldBePassed = 5;

    for (let i = 0; i < timeShouldBePassed; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    // Timer shouldn't works before game has started
    expect(screen.queryByText(timeShouldBePassed)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });

    for (let i = 0; i < timeShouldBePassed; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(await screen.findByText(timeShouldBePassed)).toBeInTheDocument();
  });
  it('Loose scenario', async () => {
    jest.useFakeTimers();

    const { asFragment } = render(
      <GameWithHooks defaultField={defautGameField} />
    );

    userEvent.click(screen.getByTestId('4,4'));

    const timeShouldBePassed = 5;

    for (let i = 0; i < timeShouldBePassed; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(await screen.findByText(timeShouldBePassed)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('0,0'));

    expect(screen.getByText('🙁')).toBeInTheDocument();

    for (let i = 0; i < timeShouldBePassed; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    // After loose time shoudn't change
    expect(await screen.findByText(timeShouldBePassed)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
  it('Win scenario', () => {
    render(<GameWithHooks defaultField={defautGameField} />);

    expect(screen.queryByText('😎')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });
    userEvent.click(screen.getByTestId('0,1'), { button: 2 });
    userEvent.click(screen.getByTestId('1,0'), { button: 2 });
    userEvent.click(screen.getByTestId('3,4'), { button: 2 });
    userEvent.click(screen.getByTestId('2,2'));
    userEvent.click(screen.getByTestId('4,4'));

    expect(screen.getByText('😎')).toBeInTheDocument();
  });
  it('Win scenario2', () => {
    render(<GameWithHooks defaultField={defautGameField} />);

    expect(screen.queryByText('😎')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('2,2'));
    userEvent.click(screen.getByTestId('4,4'));

    userEvent.click(screen.getByTestId('0,0'), { button: 2 });
    userEvent.click(screen.getByTestId('0,1'), { button: 2 });
    userEvent.click(screen.getByTestId('1,0'), { button: 2 });
    userEvent.click(screen.getByTestId('3,4'), { button: 2 });

    expect(screen.getByText('😎')).toBeInTheDocument();
  });
});
