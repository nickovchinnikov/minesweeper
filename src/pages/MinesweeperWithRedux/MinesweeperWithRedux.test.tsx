import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithRedux } from './MinesweeperWithRedux';

it('Top renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithRedux />);

  expect(asFragment()).toMatchSnapshot();
});
