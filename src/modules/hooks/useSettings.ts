import { useState } from 'react';

import { LevelNames, GameSettings, Settings } from '@/modules/GameSettings';

interface ReturnType {
  settings: Settings;
  level: LevelNames;
  setLevel: (level: LevelNames) => Settings;
}

export const useSettings = (
  defaultLevel = 'beginner' as LevelNames
): ReturnType => {
  const [level, setLevel] = useState<LevelNames>(defaultLevel);
  const [size, bombs] = GameSettings[level];

  return {
    settings: [size, bombs],
    level,
    setLevel: (level) => {
      setLevel(level);
      return GameSettings[level];
    },
  };
};
