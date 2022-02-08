import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { GameLevels, LevelNames } from '@/modules/GameSettings';

import { Scoreboard } from '@/components/Scoreboard';
import { Grid } from '@/components/Grid';
import { GameOver } from '@/components/Game';
import { useQuery } from '@/hooks/useQuery';

import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
  const history = useHistory();
  const query = useQuery();
  const urlLevelParam = (query.get('level') || undefined) as LevelNames;

  const {
    level,
    time,
    isGameOver,
    isWin,
    settings,
    playerField,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset,
  } = useGame(urlLevelParam);

  const [, bombs] = settings;

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      history.push({
        search: `?${new URLSearchParams({ level }).toString()}`,
      });
      onChangeLevel(level as LevelNames);
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return (
    <>
      <Scoreboard
        time={String(time)}
        bombs={String(bombs - flagCounter)}
        levels={GameLevels as unknown as string[]}
        defaultLevel={level}
        onChangeLevel={onChangeLevelHandler}
        onReset={onReset}
      />
      {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
      <Grid onClick={onClick} onContextMenu={onContextMenu}>
        {playerField}
      </Grid>
    </>
  );
};
