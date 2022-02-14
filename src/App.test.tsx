import React from 'react';
import { render } from '@testing-library/react';

import { App, Home } from './App';

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
