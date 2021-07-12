import React, { FC, useState } from 'react';
import styled from '@emotion/styled';

export interface ResetProps {
  /**
   * Reset action handler
   */
  onReset: () => void;
}

export const Reset: FC<ResetProps> = ({ onReset }) => {
  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = () => setMouseDown(true);
  const onMouseUp = () => setMouseDown(false);

  return (
    <Button
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onClick={onReset}
    >
      {mouseDown ? '😯' : '🙂'}
    </Button>
  );
};

const Button = styled.button`
  font-size: 1.5vw;
  cursor: pointer;
  font-weight: 700;
  border-width: 0.15vw;
  border-style: solid;
  background-color: #d1d1d1;
  border-color: white #9e9e9e #9e9e9e white;
`;
