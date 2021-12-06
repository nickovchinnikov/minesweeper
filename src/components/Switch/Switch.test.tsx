import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';

describe('Switch test cases', () => {
  it('Switch render check', () => {
    const onChange = jest.fn();

    const { asFragment } = render(
      <Switch
        label="Change"
        options={['option1', 'option2', 'option3']}
        onChange={onChange}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
  it('Select level behaviour', () => {
    const onChange = jest.fn();

    render(
      <Switch
        label="Change"
        options={['option1', 'option2', 'option3']}
        onChange={onChange}
      />
    );

    userEvent.selectOptions(screen.getByRole('combobox'), 'option2');

    expect(screen.getByRole('option', { name: 'option2' })).toBeEnabled();

    expect(onChange).toHaveBeenCalled();
  });
});
