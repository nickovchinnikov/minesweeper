import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithUseReducer } from '@/modules/GameWithRedux';

export const MinesweeperWithUseReducer: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with React+Redux and useReducer special for you
        </Top>
      }
    >
      <GameWithUseReducer />
    </GameLayout>
  );
};
