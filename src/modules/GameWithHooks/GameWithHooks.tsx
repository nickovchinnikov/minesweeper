import React, { FC } from 'react';

import { GameLevels, LevelNames } from '@/modules/GameSettings';

import { Top } from '@/components/Top';
import { Scoreboard } from '@/components/Scoreboard';
import { Grid } from '@/components/Grid';
import { GameArea, Wrapper, GameOver } from '@/components/Game';

import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
  const {
    level,
    time,
    isGameOver,
    isWin,
    settings,
    playerField,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset,
  } = useGame();

  const [, bombs] = settings;

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="right click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time={String(time)}
          bombs={String(bombs)}
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onChangeLevel={({
            target: { value: level },
          }: React.ChangeEvent<HTMLSelectElement>) =>
            onChangeLevel(level as LevelNames)
          }
          onReset={onReset}
        />
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
