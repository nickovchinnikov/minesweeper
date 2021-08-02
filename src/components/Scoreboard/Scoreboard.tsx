import React, { FC, ChangeEvent } from 'react';
import styled from '@emotion/styled';

import { Counter } from './Counter';
import { Level } from './Level';
import { Reset } from './Reset';

export interface ScoreboardProps {
  /**
   * Timer
   */
  time: string;
  /**
   * Possible game scenarios
   */
  levels: string[];
  /**
   * Action handler when the GameReset button is clicked
   */
  onReset: () => void;
  /**
   * Action handler when select new lvl
   */
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Bombs in the field
   */
  mines: string;
}

export const Scoreboard: FC<ScoreboardProps> = ({
  time,
  levels,
  mines,
  onReset,
  onChange,
}) => (
  <Wrapper>
    <Counter>{time}</Counter>
    <Level onChange={onChange}>{levels}</Level>
    <Reset onReset={onReset} />
    <Counter>{mines}</Counter>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`;
