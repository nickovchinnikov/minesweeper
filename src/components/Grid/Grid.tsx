import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Coords, Field } from '@/core/Field';

import { Cell } from './Cell';

export interface GridProps {
  /**
   * Field data
   */
  children: Field;
  /**
   * Flag counter
   */
  flagCounter: number;
  /**
   * Bombs counter
   */
  bombs: number;
  /**
   * onClick handler
   */
  onClick: (coords: Coords) => void;
  /**
   * onContextMenu handler
   */
  onContextMenu: (coords: Coords, flagCounter: number, bombs: number) => void;
}

export const Grid: FC<GridProps> = ({ children, ...rest }) => (
  <Wrapper size={children.length} role="grid">
    {children.map((row, y) =>
      row.map((cell, x) => (
        // Stryker disable next-line StringLiteral
        <Cell key={`${y}_${x}_${cell}`} coords={[y, x]} {...rest}>
          {cell}
        </Cell>
      ))
    )}
  </Wrapper>
);

interface WrapperProps {
  size: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, auto);
  width: max-content;
  padding: 1vw;
`;
