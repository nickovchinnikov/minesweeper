import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

export interface WrapperProps {
  /**
   * Game items
   */
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => (
  <Frame>{children}</Frame>
);

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
