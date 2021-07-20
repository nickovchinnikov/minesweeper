import React from 'react';
import { render } from '@testing-library/react';

import { Level } from './Level';

it('Level renders correctly', () => {
  const { asFragment } = render(
    <Level>{['beginner', 'intermediate', 'expert']}</Level>
  );

  expect(asFragment()).toMatchSnapshot();
});
