import { renderHook, act } from '@testing-library/react-hooks';

import { GameSettings } from '@/modules/GameSettings';

import { useGameSettings } from './useGameSettings';

describe('useGameSettings test cases', () => {
  it('Check default settings', () => {
    const { result } = renderHook(useGameSettings);

    expect(result.current.settings).toEqual(GameSettings.beginner);
    expect(result.current.level).toBe('beginner');
  });
  it('Check setLevel to intermediate', () => {
    const { result } = renderHook(useGameSettings);

    act(() => {
      const newSettings = result.current.setLevel('intermediate');
      expect(newSettings).toEqual(GameSettings.intermediate);
    });

    expect(result.current.settings).toEqual(GameSettings.intermediate);
    expect(result.current.level).toBe('intermediate');
  });
});
