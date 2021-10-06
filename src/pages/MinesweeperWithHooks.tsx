import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithHooks } from '@/modules/GameWithHooks';

export const MinesweeperWithHooks: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactHooks
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  );
};
