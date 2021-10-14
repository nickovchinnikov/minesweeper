import React, { FC, useReducer, useCallback } from 'react';

import { Coords } from '@/core/Field';

import { GameLevels, LevelNames } from '@/modules/GameSettings';

import { Scoreboard } from '@/components/Scoreboard';
import { Grid } from '@/components/Grid';
import { GameOver } from '@/components/Game';

import { reducer, actions, getInitialState } from './game';

export const GameWithRedux: FC = () => {
  const [
    { level, time, isGameOver, isWin, settings, playerField, flagCounter },
    dispatch,
  ] = useReducer(reducer, getInitialState());

  const [, bombs] = settings;

  const onClick = useCallback(
    (coords: Coords) => dispatch(actions.openCell(coords)),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const onReset = useCallback(
    () => dispatch(actions.reset()),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const onContextMenu = useCallback(
    (coords: Coords) => dispatch(actions.setFlag(coords)),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(actions.changeLevel(level as LevelNames)),
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
        onChangeLevel={onChangeLevel}
        onReset={onReset}
      />
      {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
      <Grid onClick={onClick} onContextMenu={onContextMenu}>
        {playerField}
      </Grid>
    </>
  );
};
