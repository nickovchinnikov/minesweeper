import { Neighbours } from './types';
import { hashRule, demonsRule, venusRule } from './transitions';

describe('Hash rule', () => {
  const neighborsBelow5: Neighbours = {
    top: 1,
    right: 0,
    bottom: 1,
    left: 0,
    rightTop: 1,
    rightBottom: 0,
    leftBottom: 1,
    leftTop: 0,
  };
  const neighborsBelow100: Neighbours = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    rightTop: 1,
    rightBottom: 1,
    leftBottom: 1,
    leftTop: 1,
  };
  const neighborsAbove100: Neighbours = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
    rightTop: 15,
    rightBottom: 15,
    leftBottom: 15,
    leftTop: 15,
  };
  describe('zero-state cell', () => {
    it('zero-state cell state & neighbors sum < 5', () => {
      expect(hashRule(0, neighborsBelow5, 16)).toBe(0);
    });
    it('zero-state cell state & neighbors sum < 100', () => {
      expect(hashRule(0, neighborsBelow100, 16)).toBe(2);
    });
    it('zero-state cell & neighbors sum > 100', () => {
      expect(hashRule(0, neighborsAbove100, 16)).toBe(3);
    });
  });
  describe('non-zero state cell', () => {
    it('non-zero state cell & neighbors sum < 5', () => {
      expect(hashRule(10, neighborsBelow5, 16)).toBe(5);
    });
    it('non-zero state cell & neighbors sum < 100', () => {
      expect(hashRule(10, neighborsBelow100, 16)).toBe(6);
    });
    it('non-zero state cell & neighbors sum > 100', () => {
      expect(hashRule(10, neighborsAbove100, 16)).toBe(15);
    });
  });
  describe('max-state cell', () => {
    it('max state cell & neighbors sum < 5', () => {
      expect(hashRule(15, neighborsBelow5, 16)).toBe(0);
    });
    it('max state cell & neighbors sum < 100', () => {
      expect(hashRule(15, neighborsBelow100, 16)).toBe(0);
    });
    it('max state cell & neighbors sum > 100', () => {
      expect(hashRule(15, neighborsAbove100, 16)).toBe(0);
    });
  });
});

describe('Demons rule', () => {
  const neighbors: Neighbours = {
    top: 1,
    right: 0,
    bottom: 1,
    left: 0,
    rightTop: 1,
    rightBottom: 0,
    leftBottom: 1,
    leftTop: 0,
  };
  it('zero-state cell', () => {
    expect(demonsRule(0, neighbors, 16)).toBe(1);
  });
  it('non-zero state cell', () => {
    expect(demonsRule(2, neighbors, 16)).toBe(2);
  });
});

describe('Venus rule', () => {
  const neighbors: Neighbours = {
    top: 1,
    right: 2,
    bottom: 3,
    left: 4,
    rightTop: 5,
    rightBottom: 6,
    leftBottom: 7,
    leftTop: 8,
  };
  it('zero-state cell', () => {
    expect(venusRule(0, neighbors)).toBe(3);
  });
  it('cell with state 1', () => {
    expect(venusRule(1, neighbors)).toBe(2);
  });
  it('cell with state 2', () => {
    expect(venusRule(2, neighbors)).toBe(3);
  });
  it('cell with state > 2', () => {
    expect(venusRule(3, neighbors)).toBe(2);
  });
});
