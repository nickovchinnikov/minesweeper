import React from 'react';
import { render } from '@testing-library/react';

import { Legend } from './Legend';

it('Legend renders correctly', () => {
  const { asFragment } = render(
    <Legend feature="Flag" firstAction="ctrl" secondAction="click" />
  );

  expect(asFragment()).toMatchSnapshot();
});
