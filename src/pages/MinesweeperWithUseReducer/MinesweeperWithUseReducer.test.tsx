import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithUseReducer } from './MinesweeperWithUseReducer';

jest.mock('@/hooks/useQuery', () => ({
  __esModule: true,
  useQuery: () => ({ get: () => null }),
}));

it('MinesweeperWithUseReducer renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithUseReducer />);

  expect(asFragment()).toMatchSnapshot();
});
