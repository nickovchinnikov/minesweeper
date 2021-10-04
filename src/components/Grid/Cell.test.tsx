import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';

import { CellState, Cell as CellType, Coords } from '@/core/Field';

import { Cell, ClosedFrame, isActiveCell, areEqual } from './Cell';

describe('Cell component check', () => {
  const coords: Coords = [1, 1];
  const props = {
    coords,
    flagCounter: 0,
    bombs: 10,
    onClick: jest.fn(),
    onContextMenu: jest.fn(),
  };

  for (let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
    it('Cell renders correct', () => {
      const { asFragment } = render(<Cell {...props}>{cell}</Cell>);

      expect(asFragment()).toMatchSnapshot();
    });
    it('Closed Frame renders correct', () => {
      const { asFragment } = render(<ClosedFrame mouseDown={true} />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('Check prevent default contextMenu for every type of cell', () => {
      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${coords}`);

      const contextMenuEvent = createEvent.contextMenu(cellComp);
      fireEvent(cellComp, contextMenuEvent);

      expect(contextMenuEvent.defaultPrevented).toBe(true);
    });

    it('onClick and onContextMenu handler should be called for active cells', () => {
      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${coords}`);

      fireEvent.click(cellComp);
      fireEvent.contextMenu(cellComp);

      if (isActiveCell(cell)) {
        expect(props.onClick).toBeCalled();
        expect(props.onContextMenu).toBeCalled();
      } else {
        expect(props.onClick).not.toBeCalled();
        expect(props.onContextMenu).not.toBeCalled();
      }
    });
  }
  it('Check areEqual', () => {
    const prevProps = {
      ...props,
      children: 0 as CellType,
    };

    expect(areEqual(prevProps, { ...prevProps })).toBe(true);

    expect(areEqual(prevProps, { ...prevProps, coords: [2, 1] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, coords: [1, 2] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, coords: [2, 2] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, coords: [1, 0] })).toBe(false);

    expect(areEqual(prevProps, { ...prevProps, children: 1 as CellType })).toBe(
      false
    );
    expect(areEqual(prevProps, { ...prevProps, onClick: jest.fn() })).toBe(
      false
    );
    expect(
      areEqual(prevProps, { ...prevProps, onContextMenu: jest.fn() })
    ).toBe(false);
  });
});
