import React from 'react';
import { render } from '@testing-library/react';

import { Top } from './Top';

it('Top renders correctly', () => {
  const { asFragment } = render(
    <Top feature="Flag" firstAction="ctrl" secondAction="click">
      Minesweeper
    </Top>
  );

  expect(asFragment()).toMatchSnapshot();
});
