import React, { FC } from 'react';
import styled from '@emotion/styled';

export const GameArea: FC = ({ children }) => <Frame>{children}</Frame>;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 6px solid #e3e3e3;
  background-color: #e3e3e3;
`;
