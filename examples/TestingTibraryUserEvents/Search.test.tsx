import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search, SearchInput } from './Search';

describe('Search test cases', () => {
  it('renders Search component', async () => {
    render(<Search />);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
  it('calls the onChange callback handler with fireEvent', () => {
    const onChange = jest.fn();

    render(<SearchInput onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('calls the onChange callback handler with userEvent', async () => {
    const onChange = jest.fn();

    render(<SearchInput onChange={onChange} />);

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
