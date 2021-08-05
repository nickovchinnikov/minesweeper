import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface GameOverProps extends FrameProps {
  /**
   * Click handler
   */
  onClick: () => void;
}

export const GameOver: FC<GameOverProps> = ({ onClick, isWin }) => (
  <Frame onClick={onClick} isWin={isWin}>
    {isWin ? '😎' : '🙁'}
  </Frame>
);

interface FrameProps {
  /**
   * Is user win flag
   */
  isWin: boolean;
}

const Frame = styled.div<FrameProps>`
  top: 60%;
  left: 50%;
  z-index: 11;
  width: 8vw;
  height: 8vw;
  font-size: 4vw;
  text-align: center;
  user-select: none;
  cursor: pointer;
  line-height: 8vw;
  position: absolute;
  border-radius: 50%;
  pointer-events: auto;
  background-color: #d1d1d1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(51, 51, 51, 0.25);
`;
