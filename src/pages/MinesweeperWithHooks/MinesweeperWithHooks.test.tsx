import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithHooks } from './MinesweeperWithHooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({}),
  useLocation: jest.fn().mockReturnValue({ search: {} }),
}));

it('MinesweeperWithHooks renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithHooks />);

  expect(asFragment()).toMatchSnapshot();
});
