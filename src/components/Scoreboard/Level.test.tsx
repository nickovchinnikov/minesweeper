import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Level } from './Level';

describe('Level test cases', () => {
  it('Level renders correctly', () => {
    const onChange = jest.fn();

    const { asFragment } = render(
      <Level onChange={onChange}>
        {['beginner', 'intermediate', 'expert']}
      </Level>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  it('Select level behaviour', () => {
    const onChange = jest.fn();

    render(
      <Level onChange={onChange}>
        {['beginner', 'intermediate', 'expert']}
      </Level>
    );

    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');

    expect(screen.getByRole('option', { name: 'intermediate' })).toBeEnabled();

    expect(onChange).toHaveBeenCalled();
  });
});
