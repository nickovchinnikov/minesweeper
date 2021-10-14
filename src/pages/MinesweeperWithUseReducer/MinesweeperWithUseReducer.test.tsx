import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithUseReducer } from './MinesweeperWithUseReducer';

it('MinesweeperWithUseReducer renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithUseReducer />);

  expect(asFragment()).toMatchSnapshot();
});
