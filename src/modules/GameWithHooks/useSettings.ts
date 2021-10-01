import { useState } from 'react';

import { LevelNames, GameSettings, Settings } from '@/modules/GameSettings';

interface Return {
  settings: Settings;
  level: LevelNames;
  setLevel: (level: LevelNames) => Settings;
}

export const useSettings = (
  defaultLevel = 'beginner' as LevelNames
): Return => {
  const [level, setLevel] = useState<LevelNames>(defaultLevel);
  const settings = GameSettings[level];

  return {
    settings,
    level,
    setLevel: (level) => {
      setLevel(level);
      return GameSettings[level];
    },
  };
};
