import { add, mul } from './mathFunctions';

describe('Math functions tests', () => {
  it('Check add function', () => {
    expect(add(1, 2)).toBe(3);
  });
  it('Check mul function', () => {
    expect(mul(2, 3)).toBe(6);
  });
});
