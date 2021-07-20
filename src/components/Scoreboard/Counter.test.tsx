import React from 'react';
import { render } from '@testing-library/react';

import { Counter } from './Counter';

it('Counter renders correctly', () => {
  const { asFragment } = render(<Counter>001</Counter>);

  expect(asFragment()).toMatchSnapshot();
});
