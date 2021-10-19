import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithHooks } from './MinesweeperWithHooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ username: 'Nikita' }),
  useLocation: jest.fn().mockReturnValue({ search: '?id=123' }),
}));

it('MinesweeperWithHooks renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithHooks />);

  expect(asFragment()).toMatchSnapshot();
});
