import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithReactRedux } from '@/modules/GameWithRedux';

export const MinesweeperWithReactRedux: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactRedux special for you
        </Top>
      }
    >
      <GameWithReactRedux />
    </GameLayout>
  );
};
