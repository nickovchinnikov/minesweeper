import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { RootState } from '@/store';
import { GameLevels, LevelNames } from '@/modules/GameSettings';
import { Scoreboard as ScoreboardComponent } from '@/components/Scoreboard';
import { actions } from '@/modules/GameWithRedux';

export const Scoreboard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlLevelParam = (searchParams.get('level') ||
      undefined) as LevelNames;
    if (urlLevelParam) {
      dispatch(actions.changeLevel(urlLevelParam as LevelNames));
    }
  }, []);

  const { level, time, bombs, flagCounter } = useSelector(
    ({ game: { level, time, bombs, flagCounter } }: RootState) => ({
      level,
      time,
      bombs,
      flagCounter,
    })
  );

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level });
      dispatch(actions.changeLevel(level as LevelNames));
    },
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
