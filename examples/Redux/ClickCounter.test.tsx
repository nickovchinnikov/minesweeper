import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { ClickCounterBasic } from './ClickCounterBasic';

describe('ClickCounterBasic component test', () => {
  it('should use custom step when incrementing', async () => {
    render(<ClickCounterBasic />);
    const decButton = screen.getByTestId('dec');
    const incButton = screen.getByTestId('inc');
    const count = screen.getByTestId('count');

    expect(count).toHaveTextContent('Count: 0');

    fireEvent.click(incButton);

    expect(count).toHaveTextContent('Count: 1');

    fireEvent.click(decButton);

    expect(count).toHaveTextContent('Count: 0');
  });
});
