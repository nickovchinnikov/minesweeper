import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { ClickCounter } from './ClickCounter';

describe('Test ClickCounter', () => {
  it('should inc/dec counter when buttons inc/dec clicked', () => {
    const mockHandler = jest.fn();

    render(<ClickCounter documentClickHandler={mockHandler} />);

    const counter = screen.getByRole('heading');
    const increaseBtn = screen.getByRole('button', { name: 'Increase' });
    const decreaseBtn = screen.getByRole('button', { name: 'Decrease' });

    expect(counter.textContent).toBe('Counter: 0');

    fireEvent.click(increaseBtn);
    expect(counter.textContent).toBe('Counter: 1');

    fireEvent.click(increaseBtn);
    expect(counter.textContent).toBe('Counter: 2');

    fireEvent.click(decreaseBtn);
    expect(counter.textContent).toBe('Counter: 1');

    fireEvent.click(decreaseBtn);
    expect(counter.textContent).toBe('Counter: 0');
  });
  it('should update title when inc/dec button clicked', async () => {
    const mockHandler = jest.fn();

    const { unmount } = render(
      <ClickCounter documentClickHandler={mockHandler} />
    );

    const increaseBtn = screen.getByRole('button', { name: 'Increase' });
    const decreaseBtn = screen.getByRole('button', { name: 'Decrease' });

    await waitFor(() => expect(document.title).toEqual('Counter: 0'));

    fireEvent.click(increaseBtn);
    await waitFor(() => expect(document.title).toEqual('Counter: 1'));
    expect(mockHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(increaseBtn);
    await waitFor(() => expect(document.title).toEqual('Counter: 2'));
    expect(mockHandler).toHaveBeenCalledTimes(2);

    fireEvent.click(decreaseBtn);
    await waitFor(() => expect(document.title).toEqual('Counter: 1'));
    expect(mockHandler).toHaveBeenCalledTimes(3);

    fireEvent.click(document);
    expect(mockHandler).toHaveBeenCalledTimes(4);

    unmount();

    fireEvent.click(document);
    expect(mockHandler).toHaveBeenCalledTimes(4);
  });
});
