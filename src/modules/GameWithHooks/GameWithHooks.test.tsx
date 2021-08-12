import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { CellState } from '@/helpers/Field';

import { GameWithHooks } from './GameWithHooks';

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

jest.mock('@/helpers/Field');

describe('GameWithHooks test cases', () => {
  describe('Render behaviour', () => {
    it('Render game field by default', () => {
      const { asFragment } = render(<GameWithHooks />);
      expect(screen.getAllByRole('cell')).toHaveLength(81);
      expect(asFragment()).toMatchSnapshot();
    });
    it('onChange game level handler', () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole('cell')).toHaveLength(81);
      userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
      expect(screen.getAllByRole('cell')).toHaveLength(256);
      userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
      expect(screen.getAllByRole('cell')).toHaveLength(484);
    });
  });
  describe('Open cell test cases', () => {
    it('Open empty cell on the beginner level', () => {
      render(<GameWithHooks />);

      expect(screen.queryAllByRole('cell', { name: String(e) })).toHaveLength(
        0
      );

      userEvent.click(screen.getByTestId('0,0'));

      expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(18);
    });
    it('Click to the non-empty cells area', () => {
      render(<GameWithHooks />);

      userEvent.click(screen.getByTestId('0,8'));

      expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(1);
    });
    it('Check click to the cell when the level is changed', () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole('cell')).toHaveLength(81);

      userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
      expect(screen.getAllByRole('cell')).toHaveLength(256);

      userEvent.click(screen.getByTestId('15,15'));
      expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(2);

      userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
      expect(screen.getAllByRole('cell')).toHaveLength(484);

      userEvent.click(screen.getByTestId('21,21'));
      expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(1);
      expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: String(2) })).toHaveLength(1);
    });
    it('onReset game handler', () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(81);

      userEvent.click(screen.getByTestId('0,8'));
      expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(1);

      userEvent.click(screen.getByTestId('0,0'));
      expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(18);

      userEvent.click(screen.getByRole('button'));
      expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(81);
    });
    describe('Game over behavior', () => {
      it('Player loose the game', () => {
        render(<GameWithHooks />);

        userEvent.click(screen.getByTestId('0,8'));
        expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(
          1
        );

        userEvent.click(screen.getByTestId('0,0'));
        expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(
          18
        );

        userEvent.click(screen.getByTestId('0,7'));

        const gameLoosePopup = screen.getByText('🙁');

        expect(gameLoosePopup).toBeInTheDocument();

        expect(screen.queryAllByRole('cell', { name: String(h) })).toHaveLength(
          0
        );
        expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(
          27
        );
        expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(
          30
        );
        expect(screen.getAllByRole('cell', { name: String(2) })).toHaveLength(
          12
        );
        expect(screen.getAllByRole('cell', { name: String(3) })).toHaveLength(
          2
        );

        userEvent.click(gameLoosePopup);

        expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(
          81
        );

        expect(screen.queryByText('🙁')).not.toBeInTheDocument();
      });
    });
  });
});
