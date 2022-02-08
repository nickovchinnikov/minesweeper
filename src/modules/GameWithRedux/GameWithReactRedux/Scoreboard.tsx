import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '@/store';
import { useQuery } from '@/hooks/useQuery';
import { GameLevels, LevelNames } from '@/modules/GameSettings';
import { Scoreboard as ScoreboardComponent } from '@/components/Scoreboard';
import { actions } from '@/modules/GameWithRedux';

export const Scoreboard: FC = () => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlLevelParam = (query.get('level') || undefined) as LevelNames;
    dispatch(actions.changeLevel(urlLevelParam as LevelNames));
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
      history.push({
        search: `?${new URLSearchParams({ level }).toString()}`,
      });
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
