import React, { FC } from 'react';

import { Scoreboard } from './Scoreboard';
import { Grid } from './Grid';
import { GameOver } from './GameOver';

export const GameWithReactRedux: FC = () => {
  return (
    <>
      <Scoreboard />
      <GameOver />
      <Grid />
    </>
  );
};
