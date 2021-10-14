import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GameLevels, LevelNames } from '@/modules/GameSettings';
import { RootState } from '@/store';
import { Scoreboard as ScoreboardComponent } from '@/components/Scoreboard';
import { actions } from '@/modules/GameWithRedux';

export const Scoreboard: FC = () => {
  const { level, time, bombs, flagCounter } = useSelector(
    ({ game: { level, time, bombs, flagCounter } }: RootState) => ({
      level,
      time,
      bombs,
      flagCounter,
    })
  );

  const dispatch = useDispatch();

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(actions.changeLevel(level as LevelNames)),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const onReset = useCallback(
    () => dispatch(actions.reset()),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return (
    <ScoreboardComponent
      time={String(time)}
      bombs={String(bombs - flagCounter)}
      levels={GameLevels as unknown as string[]}
      defaultLevel={level}
      onChangeLevel={onChangeLevel}
      onReset={onReset}
    />
  );
};
