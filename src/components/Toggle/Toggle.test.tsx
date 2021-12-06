import React, { FC } from 'react';
import { render } from '@testing-library/react';

import { Toggle } from './Toggle';

describe('Toggle button check', () => {
  it('Toggle render check', () => {
    const { asFragment } = render(
      <Toggle onClick={jest.fn()}>Stop/Start</Toggle>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
