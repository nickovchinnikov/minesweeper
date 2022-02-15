import React from 'react';
import { render } from '@testing-library/react';

import { MinesweeperWithHooks } from './MinesweeperWithHooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ username: 'Nikita' }),
  useSearchParams: jest.fn().mockReturnValue([
    {
      get: (name: string) => {
        const params: Record<string, string> = { id: '123' };
        return params[name];
      },
    },
    jest.fn(),
  ]),
}));

it('MinesweeperWithHooks renders correctly', () => {
  const { asFragment } = render(<MinesweeperWithHooks />);

  expect(asFragment()).toMatchSnapshot();
});
