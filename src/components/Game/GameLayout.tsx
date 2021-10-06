import React, { FC, ReactNode } from 'react';

import { GameArea } from './GameArea';
import { Wrapper } from './Wrapper';

export interface Props {
  /**
   * Top component prop
   */
  top: ReactNode;
  /**
   * Children = Main game area
   */
  children: ReactNode;
}

export const GameLayout: FC<Props> = ({ top, children }) => (
  <Wrapper>
    {top}
    <GameArea>{children}</GameArea>
  </Wrapper>
);
