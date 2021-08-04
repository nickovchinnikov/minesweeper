import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface GameOverProps {
  /**
   * Click handler
   */
  onClick: () => void;
}

export const GameOver: FC<GameOverProps> = ({ onClick }) => (
  <Frame onClick={onClick} />
);

const Frame = styled.div`
  top: 60%;
  left: 50%;
  z-index: 11;
  width: 8vw;
  height: 8vw;
  font-size: 4vw;
  text-align: center;
  cursor: pointer;
  line-height: 8vw;
  position: absolute;
  border-radius: 50%;
  pointer-events: auto;
  background-color: #d1d1d1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(51, 51, 51, 0.25);
  &::after {
    content: '☹️';
  }
`;
