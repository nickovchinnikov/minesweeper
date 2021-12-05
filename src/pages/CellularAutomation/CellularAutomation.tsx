import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { CellularAutomation as CellularAutomationModule } from '@/modules/CellularAutomation';

export const CellularAutomation: FC = () => {
  return (
    <GameLayout top={<h2>Cellular automation</h2>}>
      <CellularAutomationModule />
    </GameLayout>
  );
};
