import React from 'react';
import { render } from '@testing-library/react';

import { App, Home } from './App';

jest.mock('@/hooks/useQuery', () => ({
  __esModule: true,
  useQuery: () => ({ get: () => null }),
}));

describe('App test cases', () => {
  it('App renders check', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Home renders check', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
