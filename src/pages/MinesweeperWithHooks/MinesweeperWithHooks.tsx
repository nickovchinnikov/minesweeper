import React, { FC } from 'react';

import { useParams } from 'react-router-dom';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithHooks } from '@/modules/GameWithHooks';

import { useQuery } from '@/hooks/useQuery';

export const MinesweeperWithHooks: FC = () => {
  const { username } = useParams<{ username?: string }>();

  const id = useQuery().get('id');

  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactHooks special for you
          {username && `, ${username}`}
          {id && `; userId: ${id}`}
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  );
};
