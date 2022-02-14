import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithUseReducer } from './MinesweeperWithUseReducer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue([
    {
      get: () => null,
    },
    jest.fn(),
  ]),
}));

it('MinesweeperWithUseReducer renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithUseReducer />);

  expect(asFragment()).toMatchSnapshot();
});
