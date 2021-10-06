import { renderHook } from '@testing-library/react-hooks';

import { useQuery } from './useQuery';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: () => ({
    search: '?id=123',
  }),
}));

describe('useQuery hook test', () => {
  it('Should parse search params', () => {
    const { result } = renderHook(useQuery);

    expect(result.current.get('id')).toBe('123');
  });
});
