import React, { FC } from 'react';
import styled from '@emotion/styled';

export const Wrapper: FC = ({ children }) => <Frame>{children}</Frame>;

const Frame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
